import type {
  AcDcType,
  ApplicationType,
  ComponentCategory,
  LifecycleStatus,
  MountingType,
  PhaseType,
  SourceType
} from "./types";

export const COMPONENT_CATEGORIES = [
  "fuse",
  "fuse_holder",
  "circuit_breaker",
  "supplementary_protector",
  "disconnect_switch",
  "fused_disconnect_switch",
  "contactor",
  "overload_relay",
  "control_relay",
  "safety_relay",
  "solid_state_relay",
  "motor_starter",
  "vfd",
  "soft_starter",
  "power_supply",
  "control_transformer",
  "terminal_block",
  "distribution_block",
  "ground_block",
  "ethernet_switch",
  "plc",
  "io_module",
  "hmi",
  "push_button",
  "selector_switch",
  "emergency_stop",
  "pilot_light",
  "sensor",
  "limit_switch",
  "proximity_sensor",
  "photoelectric_sensor",
  "encoder",
  "solenoid_valve",
  "connector",
  "cable",
  "enclosure",
  "cooling_fan",
  "filter_fan",
  "din_rail",
  "wire_duct",
  "surge_protector",
  "emi_filter",
  "current_meter",
  "voltage_meter",
  "current_transformer",
  "shunt_resistor"
] as const satisfies readonly ComponentCategory[];

export const AC_DC_TYPES = ["AC", "DC", "AC_DC", "ANY"] as const satisfies readonly AcDcType[];
export const PHASE_TYPES = ["single_phase", "three_phase", "dc", "unknown"] as const satisfies readonly PhaseType[];
export const LIFECYCLE_STATUSES = ["active", "discontinued", "mature", "unknown"] as const satisfies readonly LifecycleStatus[];
export const SOURCE_TYPES = [
  "manufacturer_product_page",
  "manufacturer_datasheet",
  "manufacturer_catalog",
  "distributor_listing"
] as const satisfies readonly SourceType[];

export const APPLICATION_TYPES = [
  "control_circuit",
  "power_distribution",
  "motor",
  "vfd",
  "plc_io",
  "ethernet_network",
  "safety_circuit",
  "hmi_panel",
  "sensor_circuit",
  "solenoid_valve",
  "transformer_primary",
  "transformer_secondary",
  "enclosure",
  "grounding",
  "wiring",
  "general"
] as const satisfies readonly ApplicationType[];

export const MOUNTING_TYPES = [
  "din_rail",
  "panel_mount",
  "door_mount",
  "cable_mount",
  "board_mount",
  "enclosure_mount",
  "unknown"
] as const satisfies readonly MountingType[];
