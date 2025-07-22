#!/bin/bash
# Script to optimize images for deployment

# Create optimized directory
mkdir -p public/images/optimized

# Optimize PNG files (requires imagemagick)
for file in public/images/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "Optimizing $filename..."
        # Reduce quality and resize if needed
        convert "$file" -quality 85 -resize 1200x1200\> "public/images/optimized/$filename"
    fi
done

echo "Image optimization complete!"
