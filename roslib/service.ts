import * as ROSLIB from 'roslib';
import { IService } from "@/store/serviceStore";


export const getServices = async (ros: ROSLIB.Ros): Promise<IService[]> => {
    const serviceList: IService[] = [];

    const getServicesPromise = (): Promise<string[]> => {
        return new Promise((resolve) => {
            ros.getServices((services: string[]) => {
                resolve(services);
            });
        });
    };

    const getServiceTypePromise = (serviceName: string): Promise<string> => {
        return new Promise((resolve) => {
            ros.getServiceType(serviceName, (serviceType: string) => {
                resolve(serviceType);
            });
        });
    };

    try {
        const tempServiceList = await getServicesPromise();
        const servicePromises = tempServiceList.map(async (serviceName) => {
            const serviceType = await getServiceTypePromise(serviceName);
            return {
                serviceName,
                serviceType
            };
        });

        const services = await Promise.all(servicePromises);
        serviceList.push(...services);

    } catch (error) {
        console.error("Error fetching services:", error);
    }

    return filterServices(serviceList);
};

// function to filter out services which start with /rosapi/ pr /rosapi_param
export const filterServices = (services: IService[]): IService[] => {
    const filteredServices = services.filter((service) => {
        return (!service.serviceName.startsWith("/rosapi") && !service.serviceName.startsWith("/rosbridge"));
    });

    return filteredServices;
};
