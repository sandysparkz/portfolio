#!/usr/bin/env bash
set -e

SRC=../../linkedin
DST=public/certs

mkdir -p "$DST"

cp "$SRC/google-data-analytics-professional-certificate.2.png" "$DST/google-data-analytics.png"
cp "$SRC/lfd110-introduction-to-risc-v.png"                    "$DST/lfd110-riscv.png"
cp "$SRC/zephyr-technical-contributor.png"                     "$DST/zephyr-technical-contributor.png"

# Edge AI is a PDF - convert page 1 to PNG
if command -v pdftoppm >/dev/null 2>&1; then
  pdftoppm -png -r 200 -f 1 -l 1 \
    "$SRC/Edge AI Course Certificate - SANTHOSH C C.pdf" \
    /tmp/edge-ai
  mv /tmp/edge-ai-1.png "$DST/edge-ai.png"
elif command -v convert >/dev/null 2>&1; then
  convert -density 200 \
    "$SRC/Edge AI Course Certificate - SANTHOSH C C.pdf[0]" \
    "$DST/edge-ai.png"
else
  echo "!! No pdftoppm or convert installed. Install one:"
  echo "   sudo apt install poppler-utils      # gets pdftoppm"
  echo "   sudo apt install imagemagick         # gets convert"
  echo "   or export page 1 of the Edge AI PDF manually and save as $DST/edge-ai.png"
fi

echo
echo "Contents of $DST:"
ls -la "$DST"
