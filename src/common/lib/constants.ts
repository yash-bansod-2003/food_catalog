export const enum ROLES {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}

export const enum MESSAGE_BROKER_TOPIC_EVENTS {
  PRODUCT_CREATED = "product.created",
  PRODUCT_UPDATED = "product.updated",
  PRODUCT_DELETED = "product.deleted",

  TOPPING_CREATED = "topping.created",
  TOPPING_UPDATED = "topping.updated",
  TOPPING_DELETED = "topping.deleted",
}
