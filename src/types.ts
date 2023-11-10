export interface AppOptions {
  /**
   * Port to run the editor on
   */
  port: number;
  /**
   * JSON stringified Schema to be used in the editor
   */
  schemaString: string;
  /**
   * Data to be used in the editor
   * 
   * If data is not provided, data will be read from dataFilePath (if provided)
   */
  data?: Record<string, unknown>;
  /**
   * Path to the data file to be used in the editor
   * 
   * If both `dataFilePath` and `data` are not provided, an empty editor will be rendered
   */
  dataFilePath?: string | null;
  /**
   * Whether to create a backup of the data file before overwriting it
   * 
   * Only used if dataFilePath is provided
   * 
   * Defaults to true
   */
  createBackup?: boolean;
}

/**
 * @see https://github.com/json-editor/json-editor#options
 */
export interface JSONEditorOptions {
  /**
   * If `true`, JSON Editor will load external URLs in `$ref` via ajax.
   * @default false
   * */
  ajax?: boolean;
  /**
   * Allows schema references to work either with or without cors; set to protocol://host:port when api is served by different host.
   * @default ''
   */
  ajaxBase?: string;
  /**
   * If `true`, JSON Editor will make ajax call with credentials
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
   * @default false
   */
  ajaxCredentials?: string;
  /**
   * If `true`, JSON Editor will cache external URLs' schemas in `localStorage` to avoid subsequent ajax calls.
   * @default false
   */
  ajax_cache_response?: boolean;
  /**
   * If `ajax_cache_responses` is enabled, use this string to invalidate stale caches. E.g.,
   * this value should be changed when schemas are updated.
   * @default 'Current date in simplied ISO-8601 format (e.g., "2011-10-05" for October 5, 2011)'
   */
  ajax_cache_buster?: string;
  /**
   * If `true`, the label will not be displayed/added.
   * @default false
   */
  compact?: boolean;
  /**
   * If `true`, remove all "add row" buttons from arrays.
   * @default false
   */
  disable_array_add?: boolean;
  /**
   * If `true`, remove all "delete row" buttons from arrays.
   * @default false
   */
  disable_array_delete?: boolean;
  /**
   * If `true`, remove all "delete all rows" buttons from arrays.
   * @default false
   */
  disable_array_delete_all_rows?: boolean;
  /**
   * If `true`, remove all "delete last row" buttons from arrays.
   * @default false
   */
  disable_array_delete_last_row?: boolean;
  /**
   * If `true`, remove all "move up" and "move down" buttons from arrays.
   * @default false
   */
  disable_array_reorder?: boolean;
  /**
   * If `true`, add copy buttons to arrays.
   * @default false
   */
  disable_array_copy?: boolean;
  /**
   * If `true`, remove all collapse buttons from objects and arrays.
   * @default false
   */
  disable_collapse?: boolean;
  /**
   * If `true`, remove all Edit JSON buttons from objects.
   * @default true
   */
  disable_edit_json?: boolean;
  /**
   * If `true`, remove all Edit Properties buttons from objects.	
   * @default true
   */
  disable_properties?: boolean;
  /**
   * If `true`, array controls (add, delete etc) will be displayed at top of list.
   * @default false
   */
  array_controls_top?: boolean;
  /**
   * The first part of the `name` attribute of form inputs in the editor.
   * An full example name is `root[person][name]` where "`root`" is the `form_name_root`.
   * @default 'root'
   */
  form_name_root?: string;
  /**
   * The icon library to use for the editor.
   * @see https://github.com/json-editor/json-editor#css-integration
   * @default 'fontawesome5
   */
  iconlib?: string | null;
  /**
   * Display only icons in buttons. This works only if `iconlib` is set.
   * @default false
   */
  remove_button_labels?: boolean;
  /**
   * If `true`, objects can only contain properties defined with the properties keyword
   * unless the property `additionalProperties` = `true` is specified in the object schema
   * @default true
   */
  no_additional_properties?: boolean;
  /**
   * An object containing schema definitions for URLs.
   * Allows you to pre-define external schemas.
   * @default {}
   */
  refs?: Record<string, unknown>;
  /**
   * If `true`, all schemas that don't explicitly set the `required` property will be required.
   * @default false
   */
  required_by_default?: boolean;
  /**
   * If `true`, makes oneOf copy properties over when switching.
   * @default true
   */
  keep_oneof_values?: boolean;
  /**
   * If `true`, copy only existing properties over when switching.
   * @default false
   */
  keep_only_existing_values?: boolean;
  /**
   * When to show validation errors in the UI.
   * @default 'interaction'
   */
  show_errors?: 'interaction' | 'change' | 'always' | 'never';
  /**
   * The JS template engine to use.
   * @see https://github.com/json-editor/json-editor#templates
   * @default 'default'
   */
  template?: string;
  /**
   * The CSS theme to use.
   * @see https://github.com/json-editor/json-editor#css-integration
   * @default 'bootstrap5'
   */
  theme?: string;
  /**
   * If `true`, only required properties will be included by default.
   * @default false
   */
  display_required_only?: boolean;
  /**
   * If `true`, **NON** required properties will have an extra toggable checkbox near the title
   * that determines if the value must be included or not in the editor´s value
   * @default false
   */
  show_opt_in?: boolean;
  /** 
   * If true, displays a dialog box with a confirmation message before node deletion.
   * @default true
   */
  prompt_before_delete?: boolean;
  /**
   * The default value of `format` for objects. If set to table for example,
   * objects will use table/normal layout if `format` is not specified.
   * @default 'normal'
   */
  object_layout?: 'normal' | 'grid';
  /**
   * Preserve value at Move Up or Down.(No value is selected automatically upon deletion.)
   * @default true
   */
  enum_source_value_auto_select?: boolean;
  /**
   * Max depth of the nested properties to be rendered of provided json schema.
   * The missing of this option could cause "maximum call stack size exceeded" in case of
   * object properties with circular references. `0` value means "render all".
   * @default 0
   */
  max_depth?: number;
  /**
   * If true default values based on the "type" of the property will be used
   * @default true
   */
  use_default_values?: boolean;
  /**
   * A callback function to resolve an undefined **Uniform Resource Name (URN)** for `$ref`.
   * The function receives a URN and callback to pass back a serialized JSON response.
   * @param urn - The URN to resolve
   * @returns `true` if the URN can be resolved; `false` otherwise
   */
  urn_resolver?: (urn: string) => boolean | Promise<boolean>;
  /**
   * If `true`, control inputs `name` attributes will be set.
   * @default true
   */
  use_name_attributes?: boolean;
  /**
   * If `1`, inactive buttons are hidden. If `2`, inactive buttons are disabled.
   * @default 1
   */
  button_state_mode?: 1 | 2
  /**
   * This property controls whether property searches in an object editor are case-sensitive
   * @default true
   */
  case_sensitive_property_search?: boolean;
}
