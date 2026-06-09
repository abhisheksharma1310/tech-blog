declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"cloud/cloud-computing-overview.mdx": {
	id: "cloud/cloud-computing-overview.mdx";
  slug: "cloud-computing-overview";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/AI-smart/camera.mdx": {
	id: "emb-iot/arduino/Interfacing/AI-smart/camera.mdx";
  slug: "arduino-OV7670-camera-basic-image-capture-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/AI-smart/finger.mdx": {
	id: "emb-iot/arduino/Interfacing/AI-smart/finger.mdx";
  slug: "arduino-R305-AS608-fingerprint-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/AI-smart/gesture.mdx": {
	id: "emb-iot/arduino/Interfacing/AI-smart/gesture.mdx";
  slug: "arduino-APDS-9960-gesture-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/AI-smart/tracking.mdx": {
	id: "emb-iot/arduino/Interfacing/AI-smart/tracking.mdx";
  slug: "arduino-line-follower-TCRT5000-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/AI-smart/voice.mdx": {
	id: "emb-iot/arduino/Interfacing/AI-smart/voice.mdx";
  slug: "arduino-V3-Grove-voice-recognition-module";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/anemometer.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/anemometer.mdx";
  slug: "arduino-anemometer-wind-speed-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/bh1750.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/bh1750.mdx";
  slug: "arduino-bh1750-light-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/bme280.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/bme280.mdx";
  slug: "arduino-BME280-environmental-sensor";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/bme680.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/bme680.mdx";
  slug: "arduino-BME680-IAQ-gas-sensor";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/bmp180.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/bmp180.mdx";
  slug: "arduino-bmp-180-Barometric-Pressure-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/dht.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/dht.mdx";
  slug: "arduino-tempertaure-and-humidity-interfacing-dht11-dht22";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/lm35.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/lm35.mdx";
  slug: "arduino-lm35-temperature-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/mq2.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/mq2.mdx";
  slug: "arduino-MQ-2-gas-smoke-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/photoresistor.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/photoresistor.mdx";
  slug: "arduino-photoresistor-LDR-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/rain.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/rain.mdx";
  slug: "arduino-rain-sensor-FC-37-YL-83-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/soil.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/soil.mdx";
  slug: "arduino-soil-moisture-YL-69-HL-69-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/temp.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/temp.mdx";
  slug: "arduino-DS18B20-temperature-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/uv.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/uv.mdx";
  slug: "arduino-uv-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/water-level.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/water-level.mdx";
  slug: "arduino-water-level-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/Environment/waterflow.mdx": {
	id: "emb-iot/arduino/Interfacing/Environment/waterflow.mdx";
  slug: "arduino-water-flow-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/button-key/bt-key.mdx": {
	id: "emb-iot/arduino/Interfacing/button-key/bt-key.mdx";
  slug: "arduino-membrane-keypad-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/button-key/joystick.mdx": {
	id: "emb-iot/arduino/Interfacing/button-key/joystick.mdx";
  slug: "arduino-KY-023-joystick-module-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/button-key/push.mdx": {
	id: "emb-iot/arduino/Interfacing/button-key/push.mdx";
  slug: "arduino-push-button-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/button-key/rotary-enc.mdx": {
	id: "emb-iot/arduino/Interfacing/button-key/rotary-enc.mdx";
  slug: "arduino-KY-040-rotary-encoder-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/communication/433tr.mdx": {
	id: "emb-iot/arduino/Interfacing/communication/433tr.mdx";
  slug: "arduino-433-MHz-transmitter-receiver-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/communication/esp.mdx": {
	id: "emb-iot/arduino/Interfacing/communication/esp.mdx";
  slug: "arduino-esp8266-esp32-wi-fi-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/communication/gsm.mdx": {
	id: "emb-iot/arduino/Interfacing/communication/gsm.mdx";
  slug: "arduino-SIM900-gsm-gprs-shield-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/communication/hc05.mdx": {
	id: "emb-iot/arduino/Interfacing/communication/hc05.mdx";
  slug: "arduino-hc05-bluetooth-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/communication/lora.mdx": {
	id: "emb-iot/arduino/Interfacing/communication/lora.mdx";
  slug: "arduino-sx1278-lora-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/communication/nrf.mdx": {
	id: "emb-iot/arduino/Interfacing/communication/nrf.mdx";
  slug: "arduino-nRF24L01-2.4-GHz-wireless-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/communication/rfid.mdx": {
	id: "emb-iot/arduino/Interfacing/communication/rfid.mdx";
  slug: "arduino-MFRC522-RFID-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/communication/wifi-builtin.mdx": {
	id: "emb-iot/arduino/Interfacing/communication/wifi-builtin.mdx";
  slug: "arduino-wifi-builtin-wi-fi-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/7-seg-led.mdx": {
	id: "emb-iot/arduino/Interfacing/display/7-seg-led.mdx";
  slug: "arduino-7-segment-LED-single-digit-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/color.mdx": {
	id: "emb-iot/arduino/Interfacing/display/color.mdx";
  slug: "arduino-TCS3200-color-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/dmt.mdx": {
	id: "emb-iot/arduino/Interfacing/display/dmt.mdx";
  slug: "arduino-8x8-dot-matrix-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/laser.mdx": {
	id: "emb-iot/arduino/Interfacing/display/laser.mdx";
  slug: "arduino-KY-008-laser-emitter-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/lcd.mdx": {
	id: "emb-iot/arduino/Interfacing/display/lcd.mdx";
  slug: "arduino-HD44780-LCD-16x2-display-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/multi-7seg-led.mdx": {
	id: "emb-iot/arduino/Interfacing/display/multi-7seg-led.mdx";
  slug: "arduino-multiple-7-segment-LED-multiplexed-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/oled.mdx": {
	id: "emb-iot/arduino/Interfacing/display/oled.mdx";
  slug: "arduino-OLED-SSD1306-display-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/rgb-led.mdx": {
	id: "emb-iot/arduino/Interfacing/display/rgb-led.mdx";
  slug: "arduino-WS2812B-RGB-LED-strip-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/rgbled.mdx": {
	id: "emb-iot/arduino/Interfacing/display/rgbled.mdx";
  slug: "arduino-rgb-led-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/tft-touch.mdx": {
	id: "emb-iot/arduino/Interfacing/display/tft-touch.mdx";
  slug: "arduino-ILI9341-XPT2046-touchscreen-TFT-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/display/tft.mdx": {
	id: "emb-iot/arduino/Interfacing/display/tft.mdx";
  slug: "arduino-TFT-display-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motion/hcsro4.mdx": {
	id: "emb-iot/arduino/Interfacing/motion/hcsro4.mdx";
  slug: "arduino-hc-sr04-ultrasonic-distance-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motion/mic.mdx": {
	id: "emb-iot/arduino/Interfacing/motion/mic.mdx";
  slug: "arduino-microphone-sound-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motion/pir.mdx": {
	id: "emb-iot/arduino/Interfacing/motion/pir.mdx";
  slug: "arduino-pir-motion-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motion/reed.mdx": {
	id: "emb-iot/arduino/Interfacing/motion/reed.mdx";
  slug: "arduino-reed-switch-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motion/tilt.mdx": {
	id: "emb-iot/arduino/Interfacing/motion/tilt.mdx";
  slug: "arduino-tilt-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motion/vibration.mdx": {
	id: "emb-iot/arduino/Interfacing/motion/vibration.mdx";
  slug: "arduino-SW-420-piezo-vibration-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motor/dc.mdx": {
	id: "emb-iot/arduino/Interfacing/motor/dc.mdx";
  slug: "arduino-dc-motor-transistor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motor/driver.mdx": {
	id: "emb-iot/arduino/Interfacing/motor/driver.mdx";
  slug: "arduino-motor-driver-L298N-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motor/l293d.mdx": {
	id: "emb-iot/arduino/Interfacing/motor/l293d.mdx";
  slug: "arduino-L293D-motor-driver-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motor/relay.mdx": {
	id: "emb-iot/arduino/Interfacing/motor/relay.mdx";
  slug: "arduino-relay-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motor/servo.mdx": {
	id: "emb-iot/arduino/Interfacing/motor/servo.mdx";
  slug: "arduino-servo-motor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/motor/stepper.mdx": {
	id: "emb-iot/arduino/Interfacing/motor/stepper.mdx";
  slug: "arduino-stepper-motor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/orientation/adxl.mdx": {
	id: "emb-iot/arduino/Interfacing/orientation/adxl.mdx";
  slug: "arduino-ADXL335-ADXL345-accelerometer";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/orientation/gps.mdx": {
	id: "emb-iot/arduino/Interfacing/orientation/gps.mdx";
  slug: "arduino-NEO6M-NEO7M-NEO8M-GPS-module";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/orientation/mpu.mdx": {
	id: "emb-iot/arduino/Interfacing/orientation/mpu.mdx";
  slug: "arduino-MPU6050-IMU-accelerometer-gyroscope";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/power/acs712.mdx": {
	id: "emb-iot/arduino/Interfacing/power/acs712.mdx";
  slug: "arduino-acs712-current-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/power/ina219.mdx": {
	id: "emb-iot/arduino/Interfacing/power/ina219.mdx";
  slug: "arduino-ina219-current-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/time/rtc.mdx": {
	id: "emb-iot/arduino/Interfacing/time/rtc.mdx";
  slug: "arduino-DS1307-DS3231-RTC-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/Interfacing/time/sd.mdx": {
	id: "emb-iot/arduino/Interfacing/time/sd.mdx";
  slug: "arduino-sd-card-module-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/co-airthmetic-operators.mdx": {
	id: "emb-iot/arduino/programming/co-airthmetic-operators.mdx";
  slug: "arduino-arithmetic-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/co-bitwise-operators.mdx": {
	id: "emb-iot/arduino/programming/co-bitwise-operators.mdx";
  slug: "arduino-bitwise-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/co-boolean-operators.mdx": {
	id: "emb-iot/arduino/programming/co-boolean-operators.mdx";
  slug: "arduino-boolean-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/co-comparison-operators.mdx": {
	id: "emb-iot/arduino/programming/co-comparison-operators.mdx";
  slug: "arduino-comparison-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/co-compound-operators.mdx": {
	id: "emb-iot/arduino/programming/co-compound-operators.mdx";
  slug: "arduino-compound-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/co-control-structure.mdx": {
	id: "emb-iot/arduino/programming/co-control-structure.mdx";
  slug: "arduino-control-structure";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/co-pointer-access-operator.mdx": {
	id: "emb-iot/arduino/programming/co-pointer-access-operator.mdx";
  slug: "arduino-pointer-access-operator";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/first-code.mdx": {
	id: "emb-iot/arduino/programming/first-code.mdx";
  slug: "arduino-first-code";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-advance-io.mdx": {
	id: "emb-iot/arduino/programming/fn-advance-io.mdx";
  slug: "arduino-functions-advance-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-analog-io.mdx": {
	id: "emb-iot/arduino/programming/fn-analog-io.mdx";
  slug: "arduino-functions-analog-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-bits-bytes.mdx": {
	id: "emb-iot/arduino/programming/fn-bits-bytes.mdx";
  slug: "arduino-functions-bits-bytes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-characters.mdx": {
	id: "emb-iot/arduino/programming/fn-characters.mdx";
  slug: "arduino-functions-characters";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-communication.mdx": {
	id: "emb-iot/arduino/programming/fn-communication.mdx";
  slug: "arduino-functions-communication";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-digital-io.mdx": {
	id: "emb-iot/arduino/programming/fn-digital-io.mdx";
  slug: "arduino-functions-digital-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-interrupts.mdx": {
	id: "emb-iot/arduino/programming/fn-interrupts.mdx";
  slug: "arduino-functions-interrupts";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-math.mdx": {
	id: "emb-iot/arduino/programming/fn-math.mdx";
  slug: "arduino-functions-math";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-random-number.mdx": {
	id: "emb-iot/arduino/programming/fn-random-number.mdx";
  slug: "arduino-functions-random-number";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-time.mdx": {
	id: "emb-iot/arduino/programming/fn-time.mdx";
  slug: "arduino-functions-time";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/fn-wifi.mdx": {
	id: "emb-iot/arduino/programming/fn-wifi.mdx";
  slug: "arduino-functions-Wi-Fi";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/intro.mdx": {
	id: "emb-iot/arduino/programming/intro.mdx";
  slug: "arduino-intro";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/setup.mdx": {
	id: "emb-iot/arduino/programming/setup.mdx";
  slug: "arduino-setup";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/syntax.mdx": {
	id: "emb-iot/arduino/programming/syntax.mdx";
  slug: "arduino-syntax";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/vr-constants.mdx": {
	id: "emb-iot/arduino/programming/vr-constants.mdx";
  slug: "arduino-constants";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/vr-conversion.mdx": {
	id: "emb-iot/arduino/programming/vr-conversion.mdx";
  slug: "arduino-conversion";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/vr-data-types.mdx": {
	id: "emb-iot/arduino/programming/vr-data-types.mdx";
  slug: "arduino-data-types";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/vr-scope-qualifiers.mdx": {
	id: "emb-iot/arduino/programming/vr-scope-qualifiers.mdx";
  slug: "arduino-scope-qualifiers";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"emb-iot/arduino/programming/vr-utilities.mdx": {
	id: "emb-iot/arduino/programming/vr-utilities.mdx";
  slug: "arduino-utilities";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-arrays.mdx": {
	id: "programming/c/c-arrays.mdx";
  slug: "c-arrays";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-conditionals.mdx": {
	id: "programming/c/c-conditionals.mdx";
  slug: "c-conditionals";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-constants.mdx": {
	id: "programming/c/c-constants.mdx";
  slug: "c-constants";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-enum.mdx": {
	id: "programming/c/c-enum.mdx";
  slug: "c-enums";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-functions.mdx": {
	id: "programming/c/c-functions.mdx";
  slug: "c-functions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-header-file.mdx": {
	id: "programming/c/c-header-file.mdx";
  slug: "c-header-files";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-input-output.mdx": {
	id: "programming/c/c-input-output.mdx";
  slug: "c-input-output";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-intro.mdx": {
	id: "programming/c/c-intro.mdx";
  slug: "c-intro";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-loops.mdx": {
	id: "programming/c/c-loops.mdx";
  slug: "c-loops";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-miscellaneous.mdx": {
	id: "programming/c/c-miscellaneous.mdx";
  slug: "c-miscellaneous";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-operators.mdx": {
	id: "programming/c/c-operators.mdx";
  slug: "c-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-pointers.mdx": {
	id: "programming/c/c-pointers.mdx";
  slug: "c-pointers";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-preprocessor.mdx": {
	id: "programming/c/c-preprocessor.mdx";
  slug: "c-preprocessor";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-strings.mdx": {
	id: "programming/c/c-strings.mdx";
  slug: "c-strings";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-structures.mdx": {
	id: "programming/c/c-structures.mdx";
  slug: "c-structures";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-typedef.mdx": {
	id: "programming/c/c-typedef.mdx";
  slug: "c-typedef";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/c/c-variables-and-data-types.mdx": {
	id: "programming/c/c-variables-and-data-types.mdx";
  slug: "c-variables-and-data-type";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/advanced-data-types.mdx": {
	id: "programming/js/advanced-data-types.mdx";
  slug: "javascript-advanced-data-types";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/advanced-functions.mdx": {
	id: "programming/js/advanced-functions.mdx";
  slug: "javascript-advanced-functions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/classes.mdx": {
	id: "programming/js/classes.mdx";
  slug: "javascript-classes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/code-quality.mdx": {
	id: "programming/js/code-quality.mdx";
  slug: "javascript-code-quality";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/data-types.mdx": {
	id: "programming/js/data-types.mdx";
  slug: "javascript-data-types";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/error-handling.mdx": {
	id: "programming/js/error-handling.mdx";
  slug: "javascript-error-handling";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/functions.mdx": {
	id: "programming/js/functions.mdx";
  slug: "javascript-functions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/fundamentals.mdx": {
	id: "programming/js/fundamentals.mdx";
  slug: "javascript-fundamentals";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/generators.mdx": {
	id: "programming/js/generators.mdx";
  slug: "javascript-generators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/introduction.mdx": {
	id: "programming/js/introduction.mdx";
  slug: "introduction-to-javascript";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/misc.mdx": {
	id: "programming/js/misc.mdx";
  slug: "javascript-miscellaneous";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/modules.mdx": {
	id: "programming/js/modules.mdx";
  slug: "javascript-modules";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/object-properties.mdx": {
	id: "programming/js/object-properties.mdx";
  slug: "javascript-object-properties";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/objects.mdx": {
	id: "programming/js/objects.mdx";
  slug: "javascript-objects";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/operators.mdx": {
	id: "programming/js/operators.mdx";
  slug: "javascript-operators-loops";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/promises.mdx": {
	id: "programming/js/promises.mdx";
  slug: "javascript-promises-async";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"programming/js/prototypes.mdx": {
	id: "programming/js/prototypes.mdx";
  slug: "javascript-prototypes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/adding-css.mdx": {
	id: "web/frontend/css/adding-css.mdx";
  slug: "css-adding-css";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/animations.mdx": {
	id: "web/frontend/css/animations.mdx";
  slug: "css-animations";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/attribute-selectors.mdx": {
	id: "web/frontend/css/attribute-selectors.mdx";
  slug: "css-attribute-selectors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/backgrounds.mdx": {
	id: "web/frontend/css/backgrounds.mdx";
  slug: "css-backgrounds";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/border.mdx": {
	id: "web/frontend/css/border.mdx";
  slug: "css-border";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/box-model.mdx": {
	id: "web/frontend/css/box-model.mdx";
  slug: "css-box-model";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/box-sizing.mdx": {
	id: "web/frontend/css/box-sizing.mdx";
  slug: "css-box-sizing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/calc.mdx": {
	id: "web/frontend/css/calc.mdx";
  slug: "css-calc";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/cascade.mdx": {
	id: "web/frontend/css/cascade.mdx";
  slug: "css-cascade";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/centering.mdx": {
	id: "web/frontend/css/centering.mdx";
  slug: "css-centering";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/colors.mdx": {
	id: "web/frontend/css/colors.mdx";
  slug: "css-colors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/comments.mdx": {
	id: "web/frontend/css/comments.mdx";
  slug: "css-comments";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/custom-properties.mdx": {
	id: "web/frontend/css/custom-properties.mdx";
  slug: "css-custom-properties";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/display.mdx": {
	id: "web/frontend/css/display.mdx";
  slug: "css-display";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/error-handling.mdx": {
	id: "web/frontend/css/error-handling.mdx";
  slug: "css-error-handling";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/feature-queries.mdx": {
	id: "web/frontend/css/feature-queries.mdx";
  slug: "css-feature-queries";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/filters.mdx": {
	id: "web/frontend/css/filters.mdx";
  slug: "css-filters";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/flexbox.mdx": {
	id: "web/frontend/css/flexbox.mdx";
  slug: "css-flexbox";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/float-and-clear.mdx": {
	id: "web/frontend/css/float-and-clear.mdx";
  slug: "css-float-and-clear";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/fonts.mdx": {
	id: "web/frontend/css/fonts.mdx";
  slug: "css-fonts";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/grid.mdx": {
	id: "web/frontend/css/grid.mdx";
  slug: "css-grid";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/history.mdx": {
	id: "web/frontend/css/history.mdx";
  slug: "css-history";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/import.mdx": {
	id: "web/frontend/css/import.mdx";
  slug: "css-import";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/inheritance.mdx": {
	id: "web/frontend/css/inheritance.mdx";
  slug: "css-inheritance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/introduction.mdx": {
	id: "web/frontend/css/introduction.mdx";
  slug: "css-introduction";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/lists.mdx": {
	id: "web/frontend/css/lists.mdx";
  slug: "css-lists";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/margin.mdx": {
	id: "web/frontend/css/margin.mdx";
  slug: "css-margin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/media-queries.mdx": {
	id: "web/frontend/css/media-queries.mdx";
  slug: "css-media-queries";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/normalization.mdx": {
	id: "web/frontend/css/normalization.mdx";
  slug: "css-normalization";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/padding.mdx": {
	id: "web/frontend/css/padding.mdx";
  slug: "css-padding";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/positioning.mdx": {
	id: "web/frontend/css/positioning.mdx";
  slug: "css-positioning";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/print.mdx": {
	id: "web/frontend/css/print.mdx";
  slug: "css-print";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/pseudo-classes.mdx": {
	id: "web/frontend/css/pseudo-classes.mdx";
  slug: "css-pseudo-classes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/pseudo-elements.mdx": {
	id: "web/frontend/css/pseudo-elements.mdx";
  slug: "css-pseudo-elements";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/selectors.mdx": {
	id: "web/frontend/css/selectors.mdx";
  slug: "css-selectors";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/specificity.mdx": {
	id: "web/frontend/css/specificity.mdx";
  slug: "css-specificity";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/tables.mdx": {
	id: "web/frontend/css/tables.mdx";
  slug: "css-tables";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/transforms.mdx": {
	id: "web/frontend/css/transforms.mdx";
  slug: "css-transforms";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/transitions.mdx": {
	id: "web/frontend/css/transitions.mdx";
  slug: "css-transitions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/typography.mdx": {
	id: "web/frontend/css/typography.mdx";
  slug: "css-typography";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/units.mdx": {
	id: "web/frontend/css/units.mdx";
  slug: "css-units";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/url.mdx": {
	id: "web/frontend/css/url.mdx";
  slug: "css-url";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/vendor-prefixes.mdx": {
	id: "web/frontend/css/vendor-prefixes.mdx";
  slug: "css-vendor-prefixes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/css/z-index.mdx": {
	id: "web/frontend/css/z-index.mdx";
  slug: "css-z-index";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/accessibility.mdx": {
	id: "web/frontend/html/accessibility.mdx";
  slug: "accessibility-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/basics.mdx": {
	id: "web/frontend/html/basics.mdx";
  slug: "html-basics";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/body.mdx": {
	id: "web/frontend/html/body.mdx";
  slug: "body-element-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/container.mdx": {
	id: "web/frontend/html/container.mdx";
  slug: "container-tags-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/forms.mdx": {
	id: "web/frontend/html/forms.mdx";
  slug: "forms-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/head.mdx": {
	id: "web/frontend/html/head.mdx";
  slug: "head-element-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/iframe.mdx": {
	id: "web/frontend/html/iframe.mdx";
  slug: "iframe-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/images.mdx": {
	id: "web/frontend/html/images.mdx";
  slug: "images-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/links.mdx": {
	id: "web/frontend/html/links.mdx";
  slug: "links-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/media.mdx": {
	id: "web/frontend/html/media.mdx";
  slug: "media-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/tables.mdx": {
	id: "web/frontend/html/tables.mdx";
  slug: "tables-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"web/frontend/html/text.mdx": {
	id: "web/frontend/html/text.mdx";
  slug: "text-in-html";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
