export interface GenericResponse<T> {
    status?: string;
    errorCode?: string;
    message?: string;
    data?: T;
}