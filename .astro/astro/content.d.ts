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
"arduino-advance-io.mdx": {
	id: "arduino-advance-io.mdx";
  slug: "arduino-advance-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-analog-io.mdx": {
	id: "arduino-analog-io.mdx";
  slug: "arduino-analog-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-communication.mdx": {
	id: "arduino-communication.mdx";
  slug: "arduino-communication";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-digital-io.mdx": {
	id: "arduino-digital-io.mdx";
  slug: "arduino-digital-io";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-first-code.mdx": {
	id: "arduino-first-code.mdx";
  slug: "arduino-first-code";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-interrupts.mdx": {
	id: "arduino-interrupts.mdx";
  slug: "arduino-interrupts";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-intro.mdx": {
	id: "arduino-intro.mdx";
  slug: "arduino-intro";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-setup.mdx": {
	id: "arduino-setup.mdx";
  slug: "arduino-setup";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-syntax.mdx": {
	id: "arduino-syntax.mdx";
  slug: "arduino-syntax";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-time.mdx": {
	id: "arduino-time.mdx";
  slug: "arduino-time";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"arduino-wifi.mdx": {
	id: "arduino-wifi.mdx";
  slug: "arduino-Wi-Fi";
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
"cloud-computing-overview.md": {
	id: "cloud-computing-overview.md";
  slug: "cloud-computing-overview";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
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
