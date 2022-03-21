#!/usr/bin/env python

PATH = "./node_modules/react-native-web/dist/index.js"
PATCH = "export const ViewPropTypes = { style: {} }\n"

with open(PATH, "r") as f:
  lines = f.readlines()

if lines[-1] != PATCH:
  with open(PATH, "a") as f:
    f.write("\n" + PATCH)
