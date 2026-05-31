export type ComponentCategory =
  | "fuse"
  | "fuse_holder"
  | "circuit_breaker"
  | "supplementary_protector"
  | "disconnect_switch"
  | "fused_disconnect_switch"
  | "contactor"
  | "overload_relay"
  | "control_relay"
  | "safety_relay"
  | "solid_state_relay"
  | "motor_starter"
  | "vfd"
  | "soft_starter"
  | "power_supply"
  | "control_transformer"
  | "terminal_block"
  | "distribution_block"
  | "ground_block"
  | "ethernet_switch"
  | "plc"
  | "io_module"
  | "hmi"
  | "push_button"
  | "selector_switch"
  | "emergency_stop"
  | "pilot_light"
  | "sensor"
  | "limit_switch"
  | "proximity_sensor"
  | "photoelectric_sensor"
  | "encoder"
  | "solenoid_valve"
  | "connector"
  | "cable"
  | "enclosure"
  | "cooling_fan"
  | "filter_fan"
  | "din_rail"
  | "wire_duct"
  | "surge_protector"
  | "emi_filter"
  | "current_meter"
  | "voltage_meter"
  | "current_transformer"
  | "shunt_resistor";

export type AcDcType = "AC" | "DC" | "AC_DC" | "ANY";
export type PhaseType = "single_phase" | "three_phase" | "dc" | "unknown";
export type LifecycleStatus = "active" | "discontinued" | "mature" | "unknown";
export type SourceType =
  | "manufacturer_product_page"
  | "manufacturer_datasheet"
  | "manufacturer_catalog"
  | "distributor_listing";

export type ApplicationType =
  | "control_circuit"
  | "power_distribution"
  | "motor"
  | "vfd"
  | "plc_io"
  | "ethernet_network"
  | "safety_circuit"
  | "hmi_panel"
  | "sensor_circuit"
  | "solenoid_valve"
  | "transformer_primary"
  | "transformer_secondary"
  | "enclosure"
  | "grounding"
  | "wiring"
  | "general";

export type MountingType =
  | "din_rail"
  | "panel_mount"
  | "door_mount"
  | "cable_mount"
  | "board_mount"
  | "enclosure_mount"
  | "unknown";

export interface ElectricalComponent {
  id: string;
  partNumber: string;
  manufacturer: string;
  category: ComponentCategory;
  subCategory?: string;
  description: string;
  ratedVoltageV: number | null;
  ratedCurrentA: number | null;
  acDcType: AcDcType;
  phase: PhaseType | null;
  poles: number | null;
  mounting: MountingType | null;
  applications: ApplicationType[];
  standards: string[];
  lifecycleStatus: LifecycleStatus;
  sourceUrl: string;
  sourceTitle: string;
  sourceType: SourceType;
  verifiedAt: string;
  verifiedFields: string[];
  missingFields: string[];
  dataNotes: string[];
  manufacturerUrl?: string;
  datasheetUrl?: string;
  cadUrl?: string;
  imageUrl?: string;
}

export interface ComponentSource {
  sourceUrl: string;
  sourceTitle: string;
  sourceType: SourceType;
  manufacturer: string;
  verifiedAt: string;
  componentIds: string[];
}

export interface ComponentSearchInput {
  categories: ComponentCategory[];
  voltage: number | null;
  current: number | null;
  acDcType: AcDcType;
  phase: PhaseType;
  application: ApplicationType | "any";
  mounting: MountingType | "any";
  manufacturer: string;
  lifecycleStatus: LifecycleStatus | "any";
  keyword: string;
}

export interface ComponentSearchResult {
  component: ElectricalComponent;
  score: number;
  reasons: string[];
  warnings: string[];
  matchedFields: string[];
  missingDataFields: string[];
  sourceConfidence: "manufacturer_verified" | "partial_verified";
}

export type ComponentSort =
  | "best_match"
  | "manufacturer"
  | "category"
  | "rated_voltage"
  | "rated_current"
  | "lifecycle_status";
