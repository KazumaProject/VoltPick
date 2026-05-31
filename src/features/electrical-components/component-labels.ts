import type {
  ApplicationType,
  ComponentCategory,
  LifecycleStatus,
  MountingType,
  SourceType
} from "./types";

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  fuse: "Fuse",
  fuse_holder: "Fuse holder",
  circuit_breaker: "Circuit breaker",
  supplementary_protector: "Supplementary protector",
  disconnect_switch: "Disconnect switch",
  fused_disconnect_switch: "Fused disconnect switch",
  contactor: "Contactor",
  overload_relay: "Overload relay",
  control_relay: "Control relay",
  safety_relay: "Safety relay",
  solid_state_relay: "Solid state relay",
  motor_starter: "Motor starter",
  vfd: "VFD",
  soft_starter: "Soft starter",
  power_supply: "Power supply",
  control_transformer: "Control transformer",
  terminal_block: "Terminal block",
  distribution_block: "Distribution block",
  ground_block: "Ground block",
  ethernet_switch: "Ethernet switch",
  plc: "PLC",
  io_module: "I/O module",
  hmi: "HMI",
  push_button: "Push button",
  selector_switch: "Selector switch",
  emergency_stop: "Emergency stop",
  pilot_light: "Pilot light",
  sensor: "Sensor",
  limit_switch: "Limit switch",
  proximity_sensor: "Proximity sensor",
  photoelectric_sensor: "Photoelectric sensor",
  encoder: "Encoder",
  solenoid_valve: "Solenoid valve",
  connector: "Connector",
  cable: "Cable",
  enclosure: "Enclosure",
  cooling_fan: "Cooling fan",
  filter_fan: "Filter fan",
  din_rail: "DIN rail",
  wire_duct: "Wire duct",
  surge_protector: "Surge protector",
  emi_filter: "EMI filter",
  current_meter: "Current meter",
  voltage_meter: "Voltage meter",
  current_transformer: "Current transformer",
  shunt_resistor: "Shunt resistor"
};

export const APPLICATION_LABELS: Record<ApplicationType, string> = {
  control_circuit: "Control circuit",
  power_distribution: "Power distribution",
  motor: "Motor",
  vfd: "VFD",
  plc_io: "PLC I/O",
  ethernet_network: "Ethernet network",
  safety_circuit: "Safety circuit",
  hmi_panel: "HMI panel",
  sensor_circuit: "Sensor circuit",
  solenoid_valve: "Solenoid valve",
  transformer_primary: "Transformer primary",
  transformer_secondary: "Transformer secondary",
  enclosure: "Enclosure",
  grounding: "Grounding",
  wiring: "Wiring",
  general: "General"
};

export const MOUNTING_LABELS: Record<MountingType, string> = {
  din_rail: "DIN rail",
  panel_mount: "Panel mount",
  door_mount: "Door mount",
  cable_mount: "Cable mount",
  board_mount: "Board mount",
  enclosure_mount: "Enclosure mount",
  unknown: "Unknown"
};

export const LIFECYCLE_LABELS: Record<LifecycleStatus, string> = {
  active: "Active",
  discontinued: "Discontinued",
  mature: "Mature",
  unknown: "Unknown"
};

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  manufacturer_product_page: "Manufacturer product page",
  manufacturer_datasheet: "Manufacturer datasheet",
  manufacturer_catalog: "Manufacturer catalog",
  distributor_listing: "Distributor listing"
};
