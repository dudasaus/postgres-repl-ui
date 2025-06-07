#!/bin/bash

# Define the target directory
TARGET_DIR="./dist/assets"

# Check if the target directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory '$TARGET_DIR' not found."
  exit 1
fi

echo "Searching for .wasm files in '$TARGET_DIR' and renaming them to .wasma..."

# Find all .wasm files and loop through them
find "$TARGET_DIR" -type f -name "*.wasm" | while read -r wasm_file; do
  # Construct the new filename with .wasma extension
  new_file="${wasm_file%.wasm}.wasma"

  # Rename the file
  mv "$wasm_file" "$new_file"
  if [ $? -eq 0 ]; then
    echo "Renamed: '$wasm_file' -> '$new_file'"
  else
    echo "Failed to rename: '$wasm_file'"
  fi
done

echo "Renaming process complete."
