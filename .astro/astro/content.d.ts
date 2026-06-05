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
"arduino-int-ai-camera.mdx": {
	id: "arduino-int-ai-camera.mdx";
  slug: "arduino-OV7670-camera-basic-image-capture-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ai-finger.mdx": {
	id: "arduino-int-ai-finger.mdx";
  slug: "arduino-R305-AS608-fingerprint-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ai-gesture.mdx": {
	id: "arduino-int-ai-gesture.mdx";
  slug: "arduino-APDS-9960-gesture-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ai-tracking.mdx": {
	id: "arduino-int-ai-tracking.mdx";
  slug: "arduino-line-follower-TCRT5000-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ai-voice.mdx": {
	id: "arduino-int-ai-voice.mdx";
  slug: "arduino-V3-Grove-voice-recognition-module";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-bt-joystick.mdx": {
	id: "arduino-int-bt-joystick.mdx";
  slug: "arduino-KY-023-joystick-module-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-bt-key.mdx": {
	id: "arduino-int-bt-key.mdx";
  slug: "arduino-membrane-keypad-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-bt-push.mdx": {
	id: "arduino-int-bt-push.mdx";
  slug: "arduino-push-button-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-bt-rotary-enc.mdx": {
	id: "arduino-int-bt-rotary-enc.mdx";
  slug: "arduino-KY-040-rotary-encoder-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-cm-433tr.mdx": {
	id: "arduino-int-cm-433tr.mdx";
  slug: "arduino-433-MHz-transmitter-receiver-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-cm-esp.mdx": {
	id: "arduino-int-cm-esp.mdx";
  slug: "arduino-esp8266-esp32-wi-fi-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-cm-gsm.mdx": {
	id: "arduino-int-cm-gsm.mdx";
  slug: "arduino-SIM900-gsm-gprs-shield-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-cm-hc05.mdx": {
	id: "arduino-int-cm-hc05.mdx";
  slug: "arduino-hc05-bluetooth-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-cm-lora.mdx": {
	id: "arduino-int-cm-lora.mdx";
  slug: "arduino-sx1278-lora-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-cm-nrf.mdx": {
	id: "arduino-int-cm-nrf.mdx";
  slug: "arduino-nRF24L01-2.4-GHz-wireless-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-cm-rfid.mdx": {
	id: "arduino-int-cm-rfid.mdx";
  slug: "arduino-MFRC522-RFID-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-cm-wifi-builtin.mdx": {
	id: "arduino-int-cm-wifi-builtin.mdx";
  slug: "arduino-wifi-builtin-wi-fi-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-7-seg-led.mdx": {
	id: "arduino-int-di-7-seg-led.mdx";
  slug: "arduino-7-segment-LED-single-digit-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-color.mdx": {
	id: "arduino-int-di-color.mdx";
  slug: "arduino-TCS3200-color-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-dmt.mdx": {
	id: "arduino-int-di-dmt.mdx";
  slug: "arduino-8x8-dot-matrix-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-laser.mdx": {
	id: "arduino-int-di-laser.mdx";
  slug: "arduino-KY-008-laser-emitter-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-lcd.mdx": {
	id: "arduino-int-di-lcd.mdx";
  slug: "arduino-HD44780-LCD-16x2-display-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-mult-7seg-led.mdx": {
	id: "arduino-int-di-mult-7seg-led.mdx";
  slug: "arduino-multiple-7-segment-LED-multiplexed-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-oled.mdx": {
	id: "arduino-int-di-oled.mdx";
  slug: "arduino-OLED-SSD1306-display-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-rgb-led.mdx": {
	id: "arduino-int-di-rgb-led.mdx";
  slug: "arduino-WS2812B-RGB-LED-strip-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-rgbled.mdx": {
	id: "arduino-int-di-rgbled.mdx";
  slug: "arduino-rgb-led-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-tft-touch.mdx": {
	id: "arduino-int-di-tft-touch.mdx";
  slug: "arduino-ILI9341-XPT2046-touchscreen-TFT-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-di-tft.mdx": {
	id: "arduino-int-di-tft.mdx";
  slug: "arduino-TFT-display-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-anemometer.mdx": {
	id: "arduino-int-env-anemometer.mdx";
  slug: "arduino-anemometer-wind-speed-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-bh1750.mdx": {
	id: "arduino-int-env-bh1750.mdx";
  slug: "arduino-bh1750-light-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-bme280.mdx": {
	id: "arduino-int-env-bme280.mdx";
  slug: "arduino-BME280-environmental-sensor";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-bme680.mdx": {
	id: "arduino-int-env-bme680.mdx";
  slug: "arduino-BME680-IAQ-gas-sensor";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-bmp180.mdx": {
	id: "arduino-int-env-bmp180.mdx";
  slug: "arduino-bmp-180-Barometric-Pressure-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-dht.mdx": {
	id: "arduino-int-env-dht.mdx";
  slug: "arduino-tempertaure-and-humidity-interfacing-dht11-dht22";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-lm35.mdx": {
	id: "arduino-int-env-lm35.mdx";
  slug: "arduino-lm35-temperature-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-mq2.mdx": {
	id: "arduino-int-env-mq2.mdx";
  slug: "arduino-MQ-2-gas-smoke-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-photoresistor.mdx": {
	id: "arduino-int-env-photoresistor.mdx";
  slug: "arduino-photoresistor-LDR-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-rain.mdx": {
	id: "arduino-int-env-rain.mdx";
  slug: "arduino-rain-sensor-FC-37-YL-83-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-soil.mdx": {
	id: "arduino-int-env-soil.mdx";
  slug: "arduino-soil-moisture-YL-69-HL-69-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-temp.mdx": {
	id: "arduino-int-env-temp.mdx";
  slug: "arduino-DS18B20-temperature-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-uv.mdx": {
	id: "arduino-int-env-uv.mdx";
  slug: "arduino-uv-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-water-level.mdx": {
	id: "arduino-int-env-water-level.mdx";
  slug: "arduino-water-level-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-env-waterflow.mdx": {
	id: "arduino-int-env-waterflow.mdx";
  slug: "arduino-water-flow-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ma-dc.mdx": {
	id: "arduino-int-ma-dc.mdx";
  slug: "arduino-dc-motor-transistor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ma-driver.mdx": {
	id: "arduino-int-ma-driver.mdx";
  slug: "arduino-motor-driver-L298N-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ma-l293d.mdx": {
	id: "arduino-int-ma-l293d.mdx";
  slug: "arduino-L293D-motor-driver-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ma-relay.mdx": {
	id: "arduino-int-ma-relay.mdx";
  slug: "arduino-relay-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ma-servo.mdx": {
	id: "arduino-int-ma-servo.mdx";
  slug: "arduino-servo-motor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-ma-stepper.mdx": {
	id: "arduino-int-ma-stepper.mdx";
  slug: "arduino-stepper-motor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-mp-hcsro4.mdx": {
	id: "arduino-int-mp-hcsro4.mdx";
  slug: "arduino-hc-sr04-ultrasonic-distance-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-mp-mic.mdx": {
	id: "arduino-int-mp-mic.mdx";
  slug: "arduino-microphone-sound-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-mp-pir.mdx": {
	id: "arduino-int-mp-pir.mdx";
  slug: "arduino-pir-motion-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-mp-reed.mdx": {
	id: "arduino-int-mp-reed.mdx";
  slug: "arduino-reed-switch-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-mp-tilt.mdx": {
	id: "arduino-int-mp-tilt.mdx";
  slug: "arduino-tilt-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-mp-vibration.mdx": {
	id: "arduino-int-mp-vibration.mdx";
  slug: "arduino-SW-420-piezo-vibration-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-on-adxl.mdx": {
	id: "arduino-int-on-adxl.mdx";
  slug: "arduino-ADXL335-ADXL345-accelerometer";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-on-gps.mdx": {
	id: "arduino-int-on-gps.mdx";
  slug: "arduino-NEO6M-NEO7M-NEO8M-GPS-module";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-on-mpu.mdx": {
	id: "arduino-int-on-mpu.mdx";
  slug: "arduino-MPU6050-IMU-accelerometer-gyroscope";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-pe-acs712.mdx": {
	id: "arduino-int-pe-acs712.mdx";
  slug: "arduino-acs712-current-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-pe-ina219.mdx": {
	id: "arduino-int-pe-ina219.mdx";
  slug: "arduino-ina219-current-sensor-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-td-rtc.mdx": {
	id: "arduino-int-td-rtc.mdx";
  slug: "arduino-DS1307-DS3231-RTC-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-int-td-sd.mdx": {
	id: "arduino-int-td-sd.mdx";
  slug: "arduino-sd-card-module-interfacing";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-co-airthmetic-operators.mdx": {
	id: "arduino-pr-co-airthmetic-operators.mdx";
  slug: "arduino-arithmetic-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-co-bitwise-operators.mdx": {
	id: "arduino-pr-co-bitwise-operators.mdx";
  slug: "arduino-bitwise-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-co-boolean-operators.mdx": {
	id: "arduino-pr-co-boolean-operators.mdx";
  slug: "arduino-boolean-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-co-comparison-operators.mdx": {
	id: "arduino-pr-co-comparison-operators.mdx";
  slug: "arduino-comparison-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-co-compound-operators.mdx": {
	id: "arduino-pr-co-compound-operators.mdx";
  slug: "arduino-compound-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-co-control-structure.mdx": {
	id: "arduino-pr-co-control-structure.mdx";
  slug: "arduino-control-structure";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-co-pointer-access-operator.mdx": {
	id: "arduino-pr-co-pointer-access-operator.mdx";
  slug: "arduino-pointer-access-operator";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-first-code.mdx": {
	id: "arduino-pr-first-code.mdx";
  slug: "arduino-first-code";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-advance-io.mdx": {
	id: "arduino-pr-fn-advance-io.mdx";
  slug: "arduino-functions-advance-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-analog-io.mdx": {
	id: "arduino-pr-fn-analog-io.mdx";
  slug: "arduino-functions-analog-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-bits-bytes.mdx": {
	id: "arduino-pr-fn-bits-bytes.mdx";
  slug: "arduino-functions-bits-bytes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-characters.mdx": {
	id: "arduino-pr-fn-characters.mdx";
  slug: "arduino-functions-characters";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-communication.mdx": {
	id: "arduino-pr-fn-communication.mdx";
  slug: "arduino-functions-communication";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-digital-io.mdx": {
	id: "arduino-pr-fn-digital-io.mdx";
  slug: "arduino-functions-digital-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-interrupts.mdx": {
	id: "arduino-pr-fn-interrupts.mdx";
  slug: "arduino-functions-interrupts";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-math.mdx": {
	id: "arduino-pr-fn-math.mdx";
  slug: "arduino-functions-math";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-random-number.mdx": {
	id: "arduino-pr-fn-random-number.mdx";
  slug: "arduino-functions-random-number";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-time.mdx": {
	id: "arduino-pr-fn-time.mdx";
  slug: "arduino-functions-time";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-fn-wifi.mdx": {
	id: "arduino-pr-fn-wifi.mdx";
  slug: "arduino-functions-Wi-Fi";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-intro.mdx": {
	id: "arduino-pr-intro.mdx";
  slug: "arduino-intro";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-setup.mdx": {
	id: "arduino-pr-setup.mdx";
  slug: "arduino-setup";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-syntax.mdx": {
	id: "arduino-pr-syntax.mdx";
  slug: "arduino-syntax";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-vr-constants.mdx": {
	id: "arduino-pr-vr-constants.mdx";
  slug: "arduino-constants";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-vr-conversion.mdx": {
	id: "arduino-pr-vr-conversion.mdx";
  slug: "arduino-conversion";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-vr-data-types.mdx": {
	id: "arduino-pr-vr-data-types.mdx";
  slug: "arduino-data-types";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-vr-scope-qualifiers.mdx": {
	id: "arduino-pr-vr-scope-qualifiers.mdx";
  slug: "arduino-scope-qualifiers";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-pr-vr-utilities.mdx": {
	id: "arduino-pr-vr-utilities.mdx";
  slug: "arduino-utilities";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-arrays.mdx": {
	id: "c-arrays.mdx";
  slug: "c-arrays";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-conditionals.mdx": {
	id: "c-conditionals.mdx";
  slug: "c-conditionals";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-constants.mdx": {
	id: "c-constants.mdx";
  slug: "c-constants";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-enum.mdx": {
	id: "c-enum.mdx";
  slug: "c-enums";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-functions.mdx": {
	id: "c-functions.mdx";
  slug: "c-functions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-header-file.mdx": {
	id: "c-header-file.mdx";
  slug: "c-header-files";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-input-output.mdx": {
	id: "c-input-output.mdx";
  slug: "c-input-output";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-intro.mdx": {
	id: "c-intro.mdx";
  slug: "c-intro";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-loops.mdx": {
	id: "c-loops.mdx";
  slug: "c-loops";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-miscellaneous.mdx": {
	id: "c-miscellaneous.mdx";
  slug: "c-miscellaneous";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-operators.mdx": {
	id: "c-operators.mdx";
  slug: "c-operators";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-pointers.mdx": {
	id: "c-pointers.mdx";
  slug: "c-pointers";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-preprocessor.mdx": {
	id: "c-preprocessor.mdx";
  slug: "c-preprocessor";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-strings.mdx": {
	id: "c-strings.mdx";
  slug: "c-strings";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-structures.mdx": {
	id: "c-structures.mdx";
  slug: "c-structures";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-typedef.mdx": {
	id: "c-typedef.mdx";
  slug: "c-typedef";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"c-variables-and-data-types.mdx": {
	id: "c-variables-and-data-types.mdx";
  slug: "c-variables-and-data-type";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"cloud-computing-overview.mdx": {
	id: "cloud-computing-overview.mdx";
  slug: "cloud-computing-overview";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"devops-automation.mdx": {
	id: "devops-automation.mdx";
  slug: "devops-automation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"modern-html-structure.mdx": {
	id: "modern-html-structure.mdx";
  slug: "modern-html-structure";
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
