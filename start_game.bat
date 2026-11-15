@echo off
title Astro-Gotchi: Mars Outpost Survival
echo ==============================================================
echo     ASTRO-GOTCHI: MARS OUTPOST SURVIVAL
echo     NASA Space Apps Challenge - Junior Astronaut Mission Trainer
echo ==============================================================
echo.
echo Starting local outpost server on http://localhost:3000 ...
echo.
start "" http://localhost:3000/
node server.js
pause

