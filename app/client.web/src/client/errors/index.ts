export class ApplicationError extends Error {}

/**
 * Inititialization Errors
 */

export class InitError extends ApplicationError {}

export class ServiceWorkerError extends InitError {}

/**
 * Service Errors
 */

export class ServiceError extends ApplicationError {}

/**
 * Store Errors
 */

export class StoreError extends ApplicationError {}

export class StoreActionError extends StoreError {}

export class StoreReducerError extends StoreError {}

export class StoreMiddlewareError extends StoreError {}

/**
 * View Errors
 */

export class ViewError extends ApplicationError {}

export class RouteError extends ViewError {}

export class ComponentError extends ViewError {}
