# extract-image

A CLI tool that scans your project directory for image files (common formats like PNG, JPG, SVG, etc.) and outputs their paths along with size information.

Helps developers quickly locate all image resources in a project. Supports filtering by included/excluded extensions, outputs JSON or text format, and can save results to a file. Cross-platform support (macOS / Windows / Linux).

## Installation

``` bash
npm install -g extract-image
```

## 🚀 Features

✅ Scan for common image file types: .png, .jpg, .jpeg, .gif, .webp, .bmp, .tiff, .svg, .ico, .avif, .heic

✅ Supports filtering scanned formats via --only and --exclude flags

✅ Outputs results in text or json format

✅ Outputs to console or saves to a specified output file

✅ Shows file size (in KB) alongside file path

✅ Cross-platform: macOS, Windows, Linux


## Usage

``` bash
image [target-directory] [--format text|json] [--output output-file] [--only ext1,ext2,...] [--exclude ext1,ext2,...]

```

If no directory is specified, it scans the current working directory.


## Options

| Name               | Type     | Default | Description                                                        |
| ------------------ | -------- | ------- | ------------------------------------------------------------------ |
| `--format` / `-f`  | `string` | `text`  | Output format: `text` for plain list, `json` for detailed output   |
| `--output` / `-o`  | `string` | `null`  | Output file path. If omitted, prints results to the console        |
| `--only`           | `string` | `null`  | Comma-separated list of extensions to **only include** in scanning |
| `--exclude` / `-e` | `string` | `null`  | Comma-separated list of extensions to **exclude** from scanning    |
| `target-directory` | `string` | `.`     | Directory to scan for image files (positional argument)            |


## Examples

### Scan current directory and print text output

``` bash
image
```

### Scan ./assets directory and output JSON

``` bash
image ./assets --format json

```

### Scan ./src but only for .png and .jpg files

``` bash
image ./src --only png,jpg
```

### Scan ./images and exclude .ico and .webp files

``` bash
image ./images --exclude ico,webp
```

### Save scan results to a file in text format
``` bash
image ./src -o images.txt
```

## Output Example

###  Text Output (console or file):

``` bash
assets/logo.png (12.45Kb)
images/background.jpg (234.52Kb)
icons/favicon.ico (4.32Kb)
```

### JSON Output:

``` json
[
  {
    "file": "assets/logo.png",
    "size": "12.45Kb"
  },
  {
    "file": "images/background.jpg",
    "size": "234.52Kb"
  },
  {
    "file": "icons/favicon.ico",
    "size": "4.32Kb"
  }
]
```

## License
MIT (see LICENSE)

© 2025-present VN666