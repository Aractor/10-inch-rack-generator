<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UniFi 10-Inch Matte White Rack Simulator (PRO Edition)</title>
    <!-- Include html2canvas for DOM/SVG rendering and PNG downloads -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        :root {
            --bg-color: #f1f5f9; 
            --panel-bg: #ffffff; 
            --panel-border: #cbd5e1;
            --text-color: #0f172a;
            --text-muted: #64748b;
            --accent-blue: #0055ff; /* UniFi PoE Classic Blue */
            --accent-green: #10b981; /* Gigabit Green */
            --accent-orange: #f97316; /* 10G Orange */
            --accent-sfp: #00b4d8; /* SFP+ Light Blue */
            --accent-red: #ef4444;
            --rack-rail-color: #94a3b8;
            --focus-ring: 0 0 0 3px rgba(0, 85, 255, 0.4);
            --device-active-border: 2px solid var(--accent-blue);
        }

        body.dark-mode {
            --bg-color: #0f172a;
            --panel-bg: #1e293b;
            --panel-border: #334155;
            --text-color: #f8fafc;
            --text-muted: #94a3b8;
            --rack-rail-color: #475569;
            --accent-sfp: #00f0ff; /* SFP+ Dark Mode Glow Effect */
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            box-sizing: border-box;
            transition: background-color 0.3s, color 0.3s;
        }

        header {
            width: 100%;
            max-width: 1280px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            flex-wrap: wrap;
            gap: 15px;
        }

        h1 {
            margin: 0;
            font-size: 24px;
            letter-spacing: 1px;
        }

        .subtitle {
            font-size: 13px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .workspace {
            display: flex;
            gap: 25px;
            max-width: 1280px;
            width: 100%;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
        }

        .panel {
            background-color: var(--panel-bg);
            border: 1px solid var(--panel-border);
            border-radius: 12px;
            padding: 18px;
            box-sizing: border-box;
            box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
            transition: background-color 0.3s, border-color 0.3s;
        }

        .panel-title {
            margin: 0 0 15px 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-color);
            border-bottom: 1px solid var(--panel-border);
            padding-bottom: 8px;
            letter-spacing: 0.5px;
        }

        .sidebar {
            width: 380px;
            max-height: 85vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .search-input {
            width: 100%;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid var(--panel-border);
            background: var(--bg-color);
            color: var(--text-color);
            box-sizing: border-box;
            font-size: 12px;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-input:focus {
            border-color: var(--accent-blue);
            box-shadow: var(--focus-ring);
        }

        .sidebar-category {
            border: 1px solid var(--panel-border);
            background: rgba(148, 163, 184, 0.05);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
        }

        .category-title {
            font-size: 12px;
            font-weight: bold;
            color: var(--accent-blue);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            border-bottom: 1px dashed var(--panel-border);
            padding-bottom: 4px;
        }

        .device-card {
            background: var(--panel-bg);
            border: 1px solid var(--panel-border);
            border-radius: 6px;
            margin-bottom: 10px;
            padding: 10px;
            cursor: grab;
            transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .device-card:hover {
            border-color: var(--text-muted);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .device-card-title {
            font-size: 11px;
            color: var(--text-muted);
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            font-weight: bold;
        }

        .device-card .device {
            height: 38px;
        }

        .center-stage {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            min-width: 400px;
        }

        .rack-wrapper-container {
            width: 100%;
            overflow: visible;
            display: flex;
            justify-content: center;
            padding: 40px 0;
        }

        .rack-wrapper {
            position: relative;
            width: 372px;
            transition: transform 0.15s ease-out;
            padding-top: 35px;
        }

        #cable-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
            overflow: visible;
        }

        svg path.cable-path {
            pointer-events: visibleStroke;
            transition: stroke-width 0.2s, stroke 0.2s;
            stroke-dasharray: 8, 3;
            animation: cableFlow 12s linear infinite;
        }

        svg path.cable-path:hover {
            stroke-width: 4.5px !important;
            cursor: pointer;
            filter: drop-shadow(0 0 5px rgba(255,255,255,0.8));
        }

        @keyframes cableFlow {
            from { stroke-dashoffset: 200; }
            to { stroke-dashoffset: 0; }
        }

        .rack-cabinet {
            width: 100%;
            background: #1e293b;
            border: 2px solid #475569;
            padding: 24px;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.5), 0 20px 40px -10px rgba(0,0,0,0.4);
            box-sizing: border-box;
            position: relative;
            transition: background-color 0.3s, border-color 0.3s;
        }

        .rack-top-handles {
            position: absolute;
            top: -24px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            padding: 0 38px;
            pointer-events: none;
            z-index: 5;
        }

        .industrial-handle {
            width: 68px;
            height: 26px;
            position: relative;
        }

        .industrial-handle svg rect {
            transition: fill 0.3s;
        }

        .metal-bezel {
            position: absolute;
            border: 1.5px solid #475569;
            z-index: 4;
            box-sizing: border-box;
        }

        .bezel-top { 
            top: 0; left: 0; right: 0; height: 24px; 
            border-bottom: 2.5px solid #475569; 
            background: linear-gradient(to bottom, #f8fafc 0%, #cbd5e1 60%, #94a3b8 100%);
        }
        .bezel-bottom { 
            bottom: 0; left: 0; right: 0; height: 24px; 
            border-top: 2.5px solid #475569; 
            background: linear-gradient(to top, #f8fafc 0%, #cbd5e1 60%, #94a3b8 100%);
        }
        .bezel-left { 
            top: 0; bottom: 0; left: 0; width: 24px; 
            border-right: 2.5px solid #475569; 
            background: linear-gradient(to right, #f8fafc 0%, #cbd5e1 60%, #94a3b8 100%);
        }
        .bezel-right { 
            top: 0; bottom: 0; right: 0; width: 24px; 
            border-left: 2.5px solid #475569; 
            background: linear-gradient(to left, #f8fafc 0%, #cbd5e1 60%, #94a3b8 100%);
        }

        .slots-container {
            display: flex;
            flex-direction: column;
            gap: 4px;
            position: relative;
            z-index: 5;
        }

        .slot-row {
            display: flex;
            align-items: center;
        }

        .slot {
            width: 320px;
            height: 48px;
            background: rgba(30, 41, 59, 0.4);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            position: relative;
            box-sizing: border-box;
            transition: background-color 0.3s, border-color 0.3s;
        }

        .slot.thermal-hotspot::after {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: transparent;
            border: none;
            pointer-events: none;
            z-index: 3;
        }

        .slot::before { 
            content: ''; position: absolute; left: 0; top: 0; width: 20px; height: 100%;
            background: linear-gradient(to right, #94a3b8, #64748b, #94a3b8);
            border-right: 1px solid #475569; z-index: 1;
        }

        .slot::after { 
            content: ''; position: absolute; right: 0; top: 0; width: 20px; height: 100%;
            background: linear-gradient(to right, #94a3b8, #64748b, #94a3b8);
            border-left: 1px solid #475569; z-index: 1;
        }

        .rail-screw-hole-l, .rail-screw-hole-r {
            position: absolute; width: 6px; height: 6px; border-radius: 50%;
            background: #1e293b; border: 1px solid #94a3b8; z-index: 2;
        }
        .rail-screw-hole-l { left: 7px; }
        .rail-screw-hole-r { right: 7px; }
        .rail-screw-hole-l.h1, .rail-screw-hole-r.h1 { top: 5px; }
        .rail-screw-hole-l.h2, .rail-screw-hole-r.h2 { top: 22px; }
        .rail-screw-hole-l.h3, .rail-screw-hole-r.h3 { top: 39px; }

        .slot-bay {
            width: 280px; margin-left: 20px; height: 100%;
            border: 1px dashed rgba(255,255,255,0.15); box-sizing: border-box;
            display: flex; align-items: center; justify-content: center;
            color: #64748b; font-size: 10px; font-family: monospace; letter-spacing: 1px;
            background-color: rgba(15, 23, 42, 0.6); transition: all 0.2s ease; z-index: 2;
        }

        .slot.drag-over .slot-bay {
            border-color: var(--accent-blue);
            background-color: rgba(0, 85, 255, 0.15);
            color: var(--accent-blue);
        }

        .device {
            width: 100%; height: 100%; display: flex; align-items: center;
            background: #ffffff; color: #475569; user-select: none;
            box-sizing: border-box; position: relative; z-index: 5;
            border-radius: 3px; outline: none; border: 1.5px solid #cbd5e1;
        }

        body.dark-mode .device:not(.placed) { background: #1e293b; color: #f8fafc; border-color: #475569; }

        .device.placed {
            position: absolute; top: 0; left: 0;
            width: 320px !important; height: 100%; z-index: 10;
            animation: snapEffect 0.15s ease-out;
            border: none;
            box-sizing: border-box;
        }

        .device.placed:focus-within, .device.placed.selected {
            box-shadow: inset 0 0 0 2px var(--accent-blue), var(--focus-ring);
        }

        .ear-l, .ear-r {
            width: 20px; height: 100%;
            background: linear-gradient(to bottom, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%);
            display: flex; align-items: center; justify-content: center;
            box-sizing: border-box; position: relative; flex-shrink: 0;
        }

        .ear-l { border-right: 1px solid #cbd5e1; border-radius: 2px 0 0 2px; }
        .ear-r { border-left: 1px solid #cbd5e1; border-radius: 0 2px 2px 0; }

        .screw-hole {
            width: 9px; height: 9px; border-radius: 50%;
            background: radial-gradient(circle, #e2e8f0 10%, #64748b 70%, #1e293b 100%);
            border: 1px solid #334155; box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center; transition: all 0.2s;
            position: relative;
        }

        .screw-hole::before, .screw-hole::after {
            content: ''; position: absolute; background: #0f172a;
            box-shadow: 0 0.5px 1px rgba(255,255,255,0.3);
        }
        .screw-hole::before { width: 7px; height: 1.5px; transform: rotate(45deg); }
        .screw-hole::after { width: 1.5px; height: 7px; transform: rotate(45deg); }

        @keyframes snapEffect {
            0% { transform: scale(0.96); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }

        .device-body {
            flex-grow: 1; height: 100%; background: #ffffff;
            display: flex; align-items: center; justify-content: center;
            box-sizing: border-box; border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1;
            box-shadow: inset 0 1px 3px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.02);
            overflow: hidden; position: relative;
        }

        .device[data-type="blank"] .device-body { background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); }
        
        .device[data-type="brush-panel"] .device-body {
            background: repeating-linear-gradient(90deg, #111827, #111827 6px, #1e293b 6px, #1e293b 9px);
            box-shadow: inset 0 0 8px rgba(0,0,0,0.8);
            border-top: 1px solid #334155;
            border-bottom: 1px solid #334155;
            width: 100%;
            height: 100%;
            min-height: 28px;
        }

        .bracket-3d {
            width: 100%; height: 100%;
            background: repeating-linear-gradient(0deg, #f8fafc, #f8fafc 1.5px, #e2e8f0 1.5px, #e2e8f0 3px);
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.08);
            display: flex; align-items: center; justify-content: center;
            border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; box-sizing: border-box;
        }

        .unifi-chassis {
            background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 5px;
            height: 34px; display: flex; align-items: center; justify-content: center;
            padding: 0 10px; box-shadow: 0 3px 6px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9);
            box-sizing: border-box;
        }

        .dell-chassis {
            background: #18181b;
            border: 1.5px solid #3f3f46;
            border-radius: 4px;
            height: 34px;
            display: flex;
            align-items: center;
            padding: 2px 6px;
            box-sizing: border-box;
            box-shadow: inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.4);
        }

        .dell-faceplate {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .dell-left-panel {
            display: flex;
            align-items: center;
            gap: 5px;
            height: 100%;
            padding-right: 6px;
            border-right: 1px solid #3f3f46;
        }

        .dell-power-btn {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 1px solid #71717a;
            background: radial-gradient(circle, #3f3f46 40%, #18181b 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .dell-power-btn .power-icon {
            width: 4px;
            height: 4px;
            border-top: 1.5px solid #38bdf8;
            border-radius: 50%;
        }

        .dell-jacks {
            display: flex;
            gap: 2px;
        }

        .dell-jack {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #090d16;
            border: 1px solid #52525b;
        }

        .dell-usb3 {
            width: 10px;
            height: 5px;
            background: #0284c7;
            border: 1px solid #38bdf8;
            border-radius: 1px;
        }

        .dell-usbc {
            width: 8px;
            height: 4px;
            background: #090d16;
            border: 1px solid #71717a;
            border-radius: 2px;
        }

        .dell-badge {
            font-size: 4.5px;
            font-family: sans-serif;
            color: #a1a1aa;
            writing-mode: vertical-lr;
            text-transform: uppercase;
            letter-spacing: -0.3px;
            transform: rotate(180deg);
            max-height: 26px;
            line-height: 1;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .dell-right-mesh {
            flex-grow: 1;
            height: 100%;
            background: repeating-linear-gradient(-45deg, #18181b, #18181b 2px, #090d16 2px, #090d16 4px);
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .dell-logo-circle {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 1px solid #cbd5e1;
            color: #f8fafc;
            font-size: 6px;
            font-weight: bold;
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(24, 24, 27, 0.85);
            letter-spacing: -0.5px;
            box-shadow: 0 0 3px rgba(0,0,0,0.5);
        }

        .unifi-screen {
            width: 22px; height: 15px; background: #090d16; border-radius: 2px;
            border: 1px solid #475569; margin-right: 10px; position: relative;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.8);
        }

        .unifi-screen::after {
            content: ''; position: absolute; top: 3px; left: 3px; width: 3px; height: 3px;
            border-radius: 50%; background: var(--accent-blue); box-shadow: 0 0 3px var(--accent-blue);
            animation: activeBlink 1.8s infinite alternate;
        }

        .patch-port-unit { display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .port-label {
            height: 10px; font-size: 7px; text-align: center; border: 1px solid #cbd5e1;
            background-color: #ffffff; color: #1e293b; border-radius: 1px; padding: 0; margin: 0; outline: none;
        }
        .device[data-type="patch-8"] .port-label { width: 22px; }
        .device[data-type="patch-12"] .port-label { width: 16px; }
        .port-label:focus { border-color: var(--accent-blue); background-color: #f8fafc; box-shadow: 0 0 3px rgba(0, 85, 255, 0.35); }

        .ports-group { display: flex; align-items: center; gap: 4px; }
        .port-gap { width: 6px; }

        .port-rj45 {
            width: 11px; height: 10px; background: #11141d;
            border: 1.5px solid #94a3b8; border-top-color: #64748b;
            box-sizing: border-box; border-radius: 1px; position: relative; cursor: pointer;
            transition: all 0.15s ease;
        }

        .port-rj45::before {
            content: ''; position: absolute; top: -6px; bottom: -6px; left: -6px; right: -6px; z-index: 1;
        }

        .port-rj45::after {
            content: ''; position: absolute; bottom: 0px; left: 2px; right: 2px; height: 2px; background: #1e293b;
        }

        .port-rj45:hover {
            border-color: var(--accent-blue) !important;
            box-shadow: 0 0 8px rgba(0, 85, 255, 0.6);
            transform: scale(1.2); z-index: 10;
        }

        .port-rj45.port-selected {
            border-color: var(--accent-blue) !important;
            box-shadow: 0 0 10px var(--accent-blue), inset 0 0 3px var(--accent-blue) !important;
            transform: scale(1.2); z-index: 10; animation: portPulse 1s infinite alternate;
        }

        @keyframes portPulse {
            0% { transform: scale(1.1); box-shadow: 0 0 4px var(--accent-blue); }
            100% { transform: scale(1.3); box-shadow: 0 0 12px var(--accent-blue); }
        }

        .switch-port-unit { display: flex; flex-direction: column; align-items: center; gap: 2.5px; }
        .led { width: 3px; height: 3px; border-radius: 50%; background-color: #e2e8f0; transition: background-color 0.3s, box-shadow 0.3s; }
        .led.active-green { background-color: var(--accent-green) !important; box-shadow: 0 0 5px var(--accent-green) !important; }
        .led.active-blue { background-color: var(--accent-blue) !important; box-shadow: 0 0 5px var(--accent-blue) !important; }
        .led.active-orange { background-color: var(--accent-orange) !important; box-shadow: 0 0 5px var(--accent-orange) !important; }
        .led.active-cyan { background-color: var(--accent-sfp) !important; box-shadow: 0 0 5px var(--accent-sfp) !important; }

        .blink { animation: activeBlink 0.9s infinite alternate; }
        .blink-slow { animation: activeBlink 1.6s infinite alternate; }

        @keyframes activeBlink {
            0% { opacity: 0.35; filter: brightness(0.7); }
            100% { opacity: 1; filter: brightness(1.3); }
        }

        .switch-grid-16 { display: flex; flex-direction: column; gap: 2px; }
        .grid-row { display: flex; gap: 2.5px; }
        .grid-row .port-rj45 { width: 10px; height: 9px; border-width: 1px; }

        .port-poe { border-color: var(--accent-blue) !important; } 
        .port-10g { border-color: var(--accent-orange) !important; } 
        .port-sfp { border-color: var(--accent-sfp) !important; } 
        .port-wan { border-color: #94a3b8 !important; } 

        .delete-btn {
            position: absolute; top: -5px; right: -5px; width: 16px; height: 16px;
            background: var(--accent-red); color: white; border-radius: 50%; display: none;
            align-items: center; justify-content: center; font-size: 11px; font-weight: bold;
            cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 1000;
        }

        .device.placed:hover .delete-btn { display: flex; }

        .right-bar { width: 280px; display: flex; flex-direction: column; gap: 20px; }

        .counter-box {
            display: flex; align-items: center; justify-content: space-between;
            padding: 10px 14px; background: rgba(148, 163, 184, 0.05);
            border: 1px solid var(--panel-border); border-radius: 8px; box-sizing: border-box;
        }

        .counter-label { font-weight: bold; font-size: 12px; color: var(--text-color); }
        .counter-number { font-size: 24px; font-weight: 800; color: var(--accent-blue); line-height: 1; }

        .report-list { display: flex; flex-direction: column; gap: 6px; font-family: monospace; font-size: 11px; }
        .report-item {
            display: flex; justify-content: space-between; padding: 6px 10px;
            background: rgba(148, 163, 184, 0.05); border-radius: 6px; border-left: 3px solid var(--panel-border);
        }
        .report-item.occupied { border-left-color: var(--accent-blue); }

        .u-badge { color: var(--text-muted); font-weight: bold; }
        .text-blue { color: var(--accent-blue); }
        .text-muted { color: var(--text-muted); }

        .btn {
            background-color: var(--panel-bg); border: 1px solid var(--panel-border);
            color: var(--text-color); padding: 8px 12px; border-radius: 6px;
            cursor: pointer; font-weight: 500; font-size: 12px; transition: all 0.2s;
            width: 100%; box-sizing: border-box; text-align: center;
        }

        .btn:hover:not(:disabled) { background-color: rgba(148, 163, 184, 0.1); border-color: var(--text-muted); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-primary { background-color: var(--accent-blue); border-color: var(--accent-blue); color: #ffffff; }
        .btn-primary:hover:not(:disabled) { background-color: #0044cc; }

        .button-group { display: flex; flex-direction: column; gap: 8px; }
        .dragging { opacity: 0.4; }

        .port-tooltip {
            position: fixed; background: rgba(15, 23, 42, 0.95); color: #ffffff;
            padding: 6px 10px; border-radius: 4px; font-size: 10px; pointer-events: none;
            z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.1);
            white-space: nowrap; display: none; transform: translate(-50%, -100%); margin-top: -8px;
        }

        .port-tooltip.tooltip-bottom { transform: translate(-50%, 0); margin-top: 8px; }

        .cable-toast {
            position: fixed; bottom: 20px; background: var(--accent-blue); color: #ffffff;
            padding: 10px 20px; border-radius: 30px; font-size: 13px; font-weight: bold;
            box-shadow: 0 10px 25px rgba(0, 85, 255, 0.3); display: none; z-index: 10000;
            animation: slideUp 0.2s ease-out;
        }

        @keyframes slideUp {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
    </style>
</head>
<body>

    <header>
        <div>
            <h1>UniFi 10-Inch Matte White Rack Simulator</h1>
            <div class="subtitle">UniFi Matte White Customizable Rack & Bracket Simulator (PRO)</div>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
            <button id="btn-dark-mode" class="btn" style="width:auto; border-radius:20px;">🌙 Dark Mode</button>
        </div>
    </header>

    <div class="workspace">
        
        <div class="panel sidebar" id="sidebar">
            <div class="panel-title">Available Device Library</div>
            <input type="text" id="search-sidebar" class="search-input" placeholder="🔍 Search device name or model (e.g., UCG, Dell, PoE)...">
            <div id="sidebar-categories"></div>
        </div>

        <div class="center-stage">
            <div class="rack-wrapper-container">
                <div class="rack-wrapper" id="rack-wrapper">
                    
                    <svg id="cable-svg">
                        <defs>
                            <filter id="cable-shadow" filterUnits="userSpaceOnUse">
                                <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#090d16" flood-opacity="0.3"/>
                            </filter>
                        </defs>
                    </svg>

                    <div class="rack-cabinet">
                        <div class="rack-top-handles">
                            <div class="industrial-handle">
                                <svg width="68" height="26" viewBox="0 0 68 26">
                                    <defs>
                                        <linearGradient id="handleGrad1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="#f8fafc"/>
                                            <stop offset="50%" stop-color="#cbd5e1"/>
                                            <stop offset="100%" stop-color="#94a3b8"/>
                                        </linearGradient>
                                    </defs>
                                    <polygon points="10,1 58,1 67,25 1,25" fill="url(#handleGrad1)" stroke="#475569" stroke-width="2" stroke-linejoin="round"/>
                                    <rect x="18" y="9" width="32" height="16" rx="2" fill="var(--bg-color)" stroke="#475569" stroke-width="2"/>
                                </svg>
                            </div>
                            <div class="industrial-handle">
                                <svg width="68" height="26" viewBox="0 0 68 26">
                                    <defs>
                                        <linearGradient id="handleGrad2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="#f8fafc"/>
                                            <stop offset="50%" stop-color="#cbd5e1"/>
                                            <stop offset="100%" stop-color="#94a3b8"/>
                                        </linearGradient>
                                    </defs>
                                    <polygon points="10,1 58,1 67,25 1,25" fill="url(#handleGrad2)" stroke="#475569" stroke-width="2" stroke-linejoin="round"/>
                                    <rect x="18" y="9" width="32" height="16" rx="2" fill="var(--bg-color)" stroke="#475569" stroke-width="2"/>
                                </svg>
                            </div>
                        </div>

                        <div class="metal-bezel bezel-top"></div>
                        <div class="metal-bezel bezel-bottom"></div>
                        <div class="metal-bezel bezel-left"></div>
                        <div class="metal-bezel bezel-right"></div>
                        
                        <div class="slots-container" id="slots-container"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-bar">

            <div class="panel">
                <div class="panel-title">Rack Specs & Zoom</div>
                <div class="counter-box" style="margin-bottom: 8px;">
                    <span class="counter-label">Total Space (U)</span>
                    <input type="number" id="input-max-u" min="1" max="16" value="6" style="width: 70px; padding: 6px; border: 1px solid var(--panel-border); border-radius: 6px; text-align: center; font-weight: bold; font-size: 14px; outline: none; background:var(--panel-bg); color:var(--text-color);">
                </div>
                <div style="display: flex; gap: 5px; margin-bottom: 8px;">
                    <button id="btn-zoom-out" class="btn" style="flex:1;">🔍- Zoom Out</button>
                    <button id="btn-zoom-reset" class="btn" style="flex:1;">Reset</button>
                    <button id="btn-zoom-in" class="btn" style="flex:1;">🔍+ Zoom In</button>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">🔌 Cable Counter</div>
                <div class="counter-box" style="margin-bottom: 10px;">
                    <span class="counter-label">Total Cables Used</span>
                    <span id="cable-count-badge" class="counter-number">0</span>
                </div>
                <div style="font-size: 11px; display: flex; flex-direction: column; gap: 5px;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>🔵 Standard / PoE:</span> <strong id="cnt-std" class="text-blue">0</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>🟠 10G Copper Cable:</span> <strong id="cnt-10g" style="color: var(--accent-orange);">0</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>🔴 WAN Uplink Cable:</span> <strong id="cnt-wan" style="color: var(--accent-red);">0</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>🌐 SFP+ Fiber Patch:</span> <strong id="cnt-sfp" style="color: var(--accent-sfp);">0</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>⚪ Patch Panel Jumpers:</span> <strong id="cnt-patch" style="color: #cbd5e1;">0</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-top: 1px dashed var(--panel-border); padding-top: 5px;">
                        <span>❌ Media Mismatch / Errors:</span> <strong id="cnt-conflict" style="color: var(--accent-red);">0</strong>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">Live Rack Assembly Status</div>
                <div id="report-list" class="report-list"></div>
            </div>

            <div class="panel">
                <div class="panel-title">System Controls</div>
                <div class="button-group">
                    <button id="btn-export-png" class="btn btn-primary">📸 Export Rack PNG Screenshot</button>
                    <button id="btn-export" class="btn">Copy Text Report</button>
                    <button id="btn-clear" class="btn">Clear Entire Rack</button>
                </div>
            </div>

        </div>

    </div>

    <div id="global-tooltip" class="port-tooltip"></div>
    <div id="cable-toast" class="cable-toast"></div>

    <script>
        function getPortCenterInSVG(svg, el) {
            const rect = el.getBoundingClientRect();
            const pt = svg.createSVGPoint();
            pt.x = rect.left + rect.width / 2;
            pt.y = rect.top + rect.height / 2;
            const ctm = svg.getScreenCTM();
            if (!ctm) return { x: 0, y: 0 };
            const svgPt = pt.matrixTransform(ctm.inverse());
            return { x: svgPt.x, y: svgPt.y };
        }

        function getMouseInSVG(svg, e) {
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const ctm = svg.getScreenCTM();
            if (!ctm) return { x: 0, y: 0 };
            const svgPt = pt.matrixTransform(ctm.inverse());
            return { x: svgPt.x, y: svgPt.y };
        }

        const DEVICE_TYPES = {
            'blank': { name: '1U White Blank Panel', ports: [], tdp: 0, poeBudget: 0, heatWeight: 0 },
            'brush-panel': { name: '1U Brush Cable Management Panel', ports: [], tdp: 0, poeBudget: 0, heatWeight: 0 },
            'patch-8': { name: '8-Port White Patch Panel', ports: Array(8).fill('patch'), tdp: 0, poeBudget: 0, heatWeight: 0 },
            'patch-12': { name: '12-Port White Patch Panel', ports: Array(12).fill('patch'), tdp: 0, poeBudget: 0, heatWeight: 0 },
            'usw-pro-xg-8-poe': { name: 'USW-Pro-XG-8-PoE (w/ 3D Bracket)', ports: [...Array(8).fill('10g-poe'), 'sfp', 'sfp'], bracket: true, bracketWidth: 220, tdp: 40, poeBudget: 200, heatWeight: 5 },
            'usw-lite-16-poe': { name: 'USW-Lite-16-PoE (w/ 3D Bracket)', ports: Array(16).fill('poe'), bracket: true, bracketWidth: 170, isGrid: true, tdp: 15, poeBudget: 45, heatWeight: 3 },
            'usw-lite-8-poe': { name: 'USW-Lite-8-PoE (w/ 3D Bracket)', ports: [...Array(4).fill('poe'), ...Array(4).fill('gbe')], bracket: true, bracketWidth: 170, tdp: 8, poeBudget: 52, heatWeight: 2 },
            'usw-flex-2.5g-8-poe': { name: 'USW-Flex-2.5G-8-PoE (w/ 3D Bracket)', ports: [...Array(8).fill('poe-2.5g'), '10g', 'sfp'], bracket: true, bracketWidth: 220, tdp: 12, poeBudget: 160, heatWeight: 3 },
            'usw-flex-2.5g-8': { name: 'USW-Flex-2.5G-8 (w/ 3D Bracket)', ports: [...Array(8).fill('2.5g'), '10g', 'sfp'], bracket: true, bracketWidth: 220, tdp: 12, poeBudget: 0, heatWeight: 3 },
            'usw-flex-2.5g-5': { name: 'USW-Flex-2.5G-5 (w/ 3D Bracket)', ports: ['poe-2.5g', ...Array(4).fill('2.5g')], bracket: true, bracketWidth: 120, tdp: 8, poeBudget: 0, heatWeight: 2, poeIn: true },
            'usw-flex-mini': { name: 'USW-Flex-Mini (w/ 3D Bracket)', ports: ['poe-gbe', ...Array(4).fill('gbe')], bracket: true, bracketWidth: 120, tdp: 2.5, poeBudget: 0, heatWeight: 1, poeIn: true },
            'usw-flex': { name: 'USW-Flex (w/ 3D Bracket)', ports: Array(5).fill('poe-gbe'), bracket: true, bracketWidth: 125, tdp: 5, poeBudget: 46, heatWeight: 2, poeIn: true },
            'usw-flex-xg': { name: 'USW-Flex-XG (w/ 3D Bracket)', ports: ['poe-gbe', ...Array(4).fill('10g')], bracket: true, bracketWidth: 130, tdp: 15, poeBudget: 0, heatWeight: 4, poeIn: true },
            'ucg-max': { name: 'Cloud Gateway Max (UCG-Max)', ports: ['wan-2.5g', ...Array(4).fill('2.5g')], hasScreen: true, bracket: true, bracketWidth: 180, layout: 'ucg-max', tdp: 16, poeBudget: 0, heatWeight: 3 },
            'ucg-ultra': { name: 'Cloud Gateway Ultra (UCG-Ultra)', ports: [...Array(4).fill('gbe'), 'wan-2.5g'], hasScreen: true, bracket: true, bracketWidth: 180, layout: 'ucg-ultra', tdp: 10, poeBudget: 0, heatWeight: 2 },
            'ucg-fiber': { name: 'Cloud Gateway Fiber (UCG-Fiber)', ports: [...Array(3).fill('2.5g'), 'poe-2.5g', 'wan-10g', 'sfp', 'sfp'], hasScreen: true, bracket: true, bracketWidth: 220, layout: 'ucg-fiber', tdp: 18, poeBudget: 0, heatWeight: 4 },
            'ux7': { name: 'UniFi Express 7 (UX7)', ports: ['2.5g', 'wan-10g'], hasScreen: true, bracket: true, bracketWidth: 140, layout: 'ux7', tdp: 15, poeBudget: 0, heatWeight: 3 },
            'dell-optiplex-micro': { name: 'Dell OptiPlex 10" 3D Adapter Host', ports: [], bracket: true, bracketWidth: 235, layout: 'dell-optiplex', tdp: 35, poeBudget: 0, heatWeight: 4 }
        };

        const PORT_SPECS = {
            'patch': { title: 'Patch Panel Port', speed: 'No bandwidth restriction (Pass-through)' },
            'poe': { title: 'PoE 1GbE Port', speed: '10/100/1000 Mbps · 802.3af PoE' },
            'gbe': { title: 'Standard 1GbE Port', speed: '10/100/1000 Mbps Standard Ethernet' },
            '10g-poe': { title: 'PoE++ 10G Port', speed: '10 Gbps · 802.3bt PoE++' },
            'poe-2.5g': { title: 'PoE++ 2.5G Port', speed: '2.5 Gbps · 802.3at PoE+' },
            '2.5g': { title: 'Standard 2.5G Port', speed: '2.5 Gbps High-Speed Ethernet' },
            'poe-gbe': { title: 'PoE Powered GbE Port', speed: '1 Gbps · Supports 802.3af/at PoE In' },
            'wan-2.5g': { title: '2.5G WAN Port', speed: '2.5 Gbps · Dedicated Internet Access' },
            'wan-10g': { title: '10G WAN Port', speed: '10 Gbps · Ultra-High-Speed Internet Access' },
            '10g': { title: '10G Copper Port', speed: '10 Gbps High-Speed Copper' },
            'sfp': { title: '10G SFP+ Fiber Slot', speed: '1/10 Gbps SFP+ Autonegotiating Module' }
        };

        const PORT_MEDIA_TYPES = {
            'patch': 'any', 'poe': 'rj45', 'gbe': 'rj45', '10g-poe': 'rj45',
            'poe-2.5g': 'rj45', '2.5g': 'rj45', 'poe-gbe': 'rj45',
            'wan-2.5g': 'rj45', 'wan-10g': 'rj45', '10g': 'rj45', 'sfp': 'sfp'
        };

        const CATEGORIES = [
            { title: '📂 1U Panels & Cable Management', types: ['blank', 'brush-panel'] },
            { title: '🔌 Patch Panels', types: ['patch-8', 'patch-12'] },
            { title: '⚡ UniFi Network Switches', types: ['usw-pro-xg-8-poe', 'usw-lite-16-poe', 'usw-lite-8-poe', 'usw-flex-2.5g-8-poe', 'usw-flex-2.5g-8', 'usw-flex-2.5g-5', 'usw-flex-mini', 'usw-flex', 'usw-flex-xg'] },
            { title: '🌐 Routers & Gateways', types: ['ucg-max', 'ucg-ultra', 'ucg-fiber', 'ux7'] },
            { title: '💻 Servers & Mini PCs (Brackets)', types: ['dell-optiplex-micro'] }
        ];

        const DeviceFactory = {
            create(type, uSlot = null) {
                const spec = DEVICE_TYPES[type];
                if (!spec) return null;

                const dev = document.createElement('div');
                dev.className = 'device';
                dev.setAttribute('data-type', type);
                dev.setAttribute('tabindex', '0');

                const earL = document.createElement('div');
                earL.className = 'ear-l';
                earL.innerHTML = '<div class="screw-hole"></div>';
                const earR = document.createElement('div');
                earR.className = 'ear-r';
                earR.innerHTML = '<div class="screw-hole"></div>';

                const body = document.createElement('div');
                body.className = 'device-body';

                if (spec.bracket) {
                    const bracket = document.createElement('div');
                    bracket.className = 'bracket-3d';

                    if (spec.layout === 'dell-optiplex') {
                        const chassis = document.createElement('div');
                        chassis.className = 'dell-chassis';
                        chassis.style.width = `${spec.bracketWidth}px`;
                        chassis.innerHTML = `
                            <div class="dell-faceplate">
                                <div class="dell-left-panel">
                                    <div class="dell-power-btn"><div class="power-icon"></div></div>
                                    <div class="dell-jacks">
                                        <div class="dell-jack"></div>
                                        <div class="dell-jack"></div>
                                    </div>
                                    <div class="dell-usb3"></div>
                                    <div class="dell-usbc"></div>
                                    <div class="dell-badge">OptiPlex</div>
                                </div>
                                <div class="dell-right-mesh">
                                    <div class="dell-logo-circle">DELL</div>
                                </div>
                            </div>
                        `;
                        bracket.appendChild(chassis);
                    } else {
                        const chassis = document.createElement('div');
                        chassis.className = 'unifi-chassis';
                        chassis.style.width = `${spec.bracketWidth}px`;

                        if (spec.hasScreen) {
                            const screen = document.createElement('div');
                            screen.className = 'unifi-screen';
                            chassis.appendChild(screen);
                        }

                        const portsGroup = this.renderPorts(type, spec, uSlot);
                        chassis.appendChild(portsGroup);
                        bracket.appendChild(chassis);
                    }

                    body.appendChild(bracket);
                } else {
                    const portsGroup = this.renderPorts(type, spec, uSlot);
                    if (portsGroup.children.length > 0) {
                        body.appendChild(portsGroup);
                    }
                }

                dev.appendChild(earL);
                dev.appendChild(body);
                dev.appendChild(earR);

                if (uSlot) {
                    dev.classList.add('placed');
                    this.setupPlacedActions(dev);
                }

                return dev;
            },

            renderPorts(type, spec, uSlot) {
                const portsGroup = document.createElement('div');
                portsGroup.className = 'ports-group';

                if (spec.isGrid) {
                    portsGroup.className = 'switch-grid-16';
                    const row1 = document.createElement('div'); row1.className = 'grid-row';
                    const row2 = document.createElement('div'); row2.className = 'grid-row';

                    spec.ports.forEach((ptype, idx) => {
                        const port = this.createRJ45(ptype, idx, uSlot);
                        if (idx % 2 === 0) row1.appendChild(port);
                        else row2.appendChild(port);
                    });
                    portsGroup.appendChild(row1);
                    portsGroup.appendChild(row2);
                    return portsGroup;
                }

                spec.ports.forEach((ptype, idx) => {
                    if (spec.layout === 'ucg-max' && idx === 1) portsGroup.appendChild(this.createGap(8));
                    if (spec.layout === 'ucg-ultra' && idx === 4) portsGroup.appendChild(this.createGap(8));
                    if (spec.layout === 'ucg-fiber' && (idx === 4 || idx === 5)) portsGroup.appendChild(this.createGap(6));
                    if (type === 'usw-pro-xg-8-poe' && idx === 8) portsGroup.appendChild(this.createGap(6));

                    const unit = document.createElement('div');
                    if (ptype === 'patch') {
                        unit.className = 'patch-port-unit';
                        const input = document.createElement('input');
                        input.type = 'text'; input.className = 'port-label';
                        input.placeholder = (idx + 1).toString(); input.maxLength = 8;
                        input.addEventListener('input', () => App.update());
                        const port = this.createRJ45(ptype, idx, uSlot);
                        unit.appendChild(input); unit.appendChild(port);
                    } else {
                        unit.className = 'switch-port-unit';
                        const led = document.createElement('div'); led.className = 'led';
                        const port = this.createRJ45(ptype, idx, uSlot);
                        unit.appendChild(led); unit.appendChild(port);
                    }
                    portsGroup.appendChild(unit);
                });

                return portsGroup;
            },

            createRJ45(ptype, idx, uSlot) {
                const port = document.createElement('div');
                port.className = 'port-rj45';
                if (ptype.includes('poe')) port.classList.add('port-poe');
                if (ptype.includes('10g')) port.classList.add('port-10g');
                if (ptype === 'sfp') port.classList.add('port-sfp');
                if (ptype.startsWith('wan')) port.classList.add('port-wan');

                port.setAttribute('tabindex', uSlot ? '0' : '-1');
                if (uSlot) port.dataset.portId = `u${uSlot}-p${idx}`;

                port.addEventListener('mouseenter', e => Tooltip.show(e, ptype, uSlot, idx));
                port.addEventListener('mouseleave', () => Tooltip.hide());
                port.addEventListener('focus', e => Tooltip.show(e, ptype, uSlot, idx));
                port.addEventListener('blur', () => Tooltip.hide());

                return port;
            },

            createGap(width) {
                const gap = document.createElement('div');
                gap.className = 'port-gap'; gap.style.width = `${width}px`;
                return gap;
            },

            setupPlacedActions(device) {
                device.setAttribute('draggable', 'true');
                device.addEventListener('dragstart', e => {
                    App.draggedElement = device; App.isFromSidebar = false;
                    e.dataTransfer.effectAllowed = 'move';
                    device.classList.add('dragging'); e.stopPropagation();
                });
                device.addEventListener('dragend', () => device.classList.remove('dragging'));

                const deleteBtn = document.createElement('div');
                deleteBtn.className = 'delete-btn'; deleteBtn.innerHTML = '×';
                deleteBtn.addEventListener('click', e => { e.stopPropagation(); App.removeDevice(device); });
                device.appendChild(deleteBtn);

                device.addEventListener('click', e => {
                    if (e.target.closest('.port-rj45') || e.target.closest('.port-label')) return;
                    document.querySelectorAll('.device.placed').forEach(d => d.classList.remove('selected'));
                    device.classList.add('selected'); device.focus();
                });
            }
        };

        const CableManager = {
            activeLine: null, dragStartPort: null,

            init() {
                document.addEventListener('mousedown', e => {
                    const port = e.target.closest('.port-rj45');
                    if (!port || !port.closest('.slot')) return;
                    e.preventDefault();
                    this.startConnection(port);
                });

                document.addEventListener('mousemove', e => {
                    if (this.dragStartPort) this.updateDragLine(e);
                });

                document.addEventListener('mouseup', e => {
                    if (!this.dragStartPort) return;
                    const targetPort = e.target.closest('.port-rj45');
                    this.endConnection(targetPort);
                });
            },

            startConnection(port) {
                const portId = port.dataset.portId;
                if (!portId) return;

                const existIdx = App.connections.findIndex(c => c.from === portId || c.to === portId);
                if (existIdx !== -1) {
                    App.connections.splice(existIdx, 1);
                    App.update();
                    return;
                }

                this.dragStartPort = port;
                port.classList.add('port-selected');
                Toast.show('Drag or click another port to establish a cable connection.');

                this.activeLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                this.activeLine.setAttribute('stroke', 'rgba(255, 255, 255, 0.85)');
                this.activeLine.setAttribute('stroke-width', '3.0');
                this.activeLine.setAttribute('fill', 'none');
                this.activeLine.setAttribute('stroke-dasharray', '5,5');
                document.getElementById('cable-svg').appendChild(this.activeLine);
            },

            updateDragLine(e) {
                const svg = document.getElementById('cable-svg');
                if (!svg || !this.dragStartPort) return;

                const startPt = getPortCenterInSVG(svg, this.dragStartPort);
                const mousePt = getMouseInSVG(svg, e);

                const x1 = startPt.x;
                const y1 = startPt.y;
                const x2 = mousePt.x;
                const y2 = mousePt.y;

                const dx = Math.abs(x2 - x1);
                const dy = Math.abs(y2 - y1);
                const sag = Math.max(dy, 60) + dx * 0.25;

                let cp_x1 = x1;
                let cp_x2 = x2;
                if (dx < 40) {
                    const loopOffset = (40 - dx) * 0.8;
                    cp_x1 += loopOffset;
                    cp_x2 += loopOffset;
                }

                const d = `M ${x1} ${y1} C ${cp_x1} ${y1 + sag} ${cp_x2} ${y2 + sag} ${x2} ${y2}`;
                this.activeLine.setAttribute('d', d);
            },

            endConnection(targetPort) {
                if (this.activeLine) { this.activeLine.remove(); this.activeLine = null; }
                const startPort = this.dragStartPort;
                this.dragStartPort = null;
                startPort.classList.remove('port-selected');
                Toast.hide();

                if (!targetPort || targetPort === startPort) return;
                const fromId = startPort.dataset.portId;
                const toId = targetPort.dataset.portId;
                if (!fromId || !toId) return;

                const existIdx = App.connections.findIndex(c => c.from === toId || c.to === toId);
                if (existIdx !== -1) App.connections.splice(existIdx, 1);

                App.connections.push({ from: fromId, to: toId });
                App.update();
            }
        };

        const App = {
            connections: [], draggedElement: null, isFromSidebar: false,
            maxU: 6, currentZoom: 1.0, redrawPending: false,

            init() {
                this.renderSidebar();
                this.renderSlots();
                this.setupDragAndDrop();
                CableManager.init();
                this.setupKeyboardDelete();
                this.setupGlobalControls();

                const isDark = localStorage.getItem('unifi_rack_sim_dark') === 'true';
                if (isDark) document.body.classList.add('dark-mode');

                this.loadFromStorage();
            },

            renderSidebar() {
                const catContainer = document.getElementById('sidebar-categories');
                catContainer.innerHTML = '';
                
                CATEGORIES.forEach(cat => {
                    const block = document.createElement('div');
                    block.className = 'sidebar-category';
                    block.innerHTML = `<div class="category-title">${cat.title}</div>`;

                    cat.types.forEach(type => {
                        const card = document.createElement('div');
                        card.className = 'device-card';
                        card.setAttribute('draggable', 'true');
                        card.setAttribute('data-device-type', type);

                        const cardTitle = document.createElement('div');
                        cardTitle.className = 'device-card-title';
                        cardTitle.innerHTML = `<span>${DEVICE_TYPES[type].name}</span>`;
                        card.appendChild(cardTitle);

                        const visualDevice = DeviceFactory.create(type);
                        card.appendChild(visualDevice);

                        card.addEventListener('dragstart', e => {
                            this.draggedElement = card; this.isFromSidebar = true;
                            e.dataTransfer.effectAllowed = 'copy'; card.classList.add('dragging');
                        });
                        card.addEventListener('dragend', () => card.classList.remove('dragging'));

                        block.appendChild(card);
                    });
                    catContainer.appendChild(block);
                });

                document.getElementById('search-sidebar').addEventListener('input', e => {
                    const query = e.target.value.toLowerCase().trim();
                    document.querySelectorAll('.device-card').forEach(card => {
                        const type = card.getAttribute('data-device-type');
                        const name = DEVICE_TYPES[type].name.toLowerCase();
                        card.style.display = name.includes(query) ? 'block' : 'none';
                    });

                    document.querySelectorAll('.sidebar-category').forEach(cat => {
                        const hasVisible = Array.from(cat.querySelectorAll('.device-card')).some(c => c.style.display !== 'none');
                        cat.style.display = hasVisible ? 'block' : 'none';
                    });
                });
            },

            renderSlots() {
                const container = document.getElementById('slots-container');
                container.innerHTML = '';
                for (let u = this.maxU; u >= 1; u--) {
                    const row = document.createElement('div');
                    row.className = 'slot-row';
                    row.innerHTML = `
                        <div class="slot" data-u="${u}">
                            <div class="rail-screw-hole-l h1"></div><div class="rail-screw-hole-l h2"></div><div class="rail-screw-hole-l h3"></div>
                            <div class="rail-screw-hole-r h1"></div><div class="rail-screw-hole-r h2"></div><div class="rail-screw-hole-r h3"></div>
                            <div class="slot-bay">1U SLOT BAY (U${u})</div>
                        </div>
                    `;
                    container.appendChild(row);
                }
            },

            setupDragAndDrop() {
                document.querySelectorAll('.slot').forEach(slot => {
                    slot.addEventListener('dragover', e => { e.preventDefault(); slot.classList.add('drag-over'); });
                    slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
                    slot.addEventListener('drop', e => {
                        e.preventDefault(); slot.classList.remove('drag-over');
                        const u = slot.getAttribute('data-u');

                        if (this.isFromSidebar) {
                            const type = this.draggedElement.getAttribute('data-device-type');
                            const newDevice = DeviceFactory.create(type, u);
                            const existDevice = slot.querySelector('.device');
                            if (existDevice) this.removeDevice(existDevice);
                            slot.appendChild(newDevice);
                        } else if (this.draggedElement && this.draggedElement.classList.contains('placed')) {
                            const targetExist = slot.querySelector('.device');
                            const sourceSlot = this.draggedElement.parentElement;
                            if (sourceSlot !== slot) {
                                if (targetExist) {
                                    const sourceU = sourceSlot.getAttribute('data-u');
                                    sourceSlot.appendChild(targetExist);
                                    slot.appendChild(this.draggedElement);
                                    this.swapDevicePortIds(this.draggedElement, u, targetExist, sourceU);
                                } else {
                                    slot.appendChild(this.draggedElement);
                                    this.rebindDevicePortIds(this.draggedElement, u);
                                }
                            }
                        }
                        this.update();
                    });
                });
            },

            rebindDevicePortIds(device, u) {
                device.querySelectorAll('.port-rj45').forEach((port, idx) => {
                    const oldId = port.dataset.portId;
                    const newId = `u${u}-p${idx}`;
                    port.dataset.portId = newId;
                    App.connections.forEach(c => {
                        if (c.from === oldId) c.from = newId;
                        if (c.to === oldId) c.to = newId;
                    });
                });
            },

            swapDevicePortIds(dev1, u1, dev2, u2) {
                const idMap = new Map();
                dev1.querySelectorAll('.port-rj45').forEach((port, idx) => {
                    idMap.set(port.dataset.portId, `u${u1}-p${idx}`);
                    port.dataset.portId = `u${u1}-p${idx}`;
                });
                dev2.querySelectorAll('.port-rj45').forEach((port, idx) => {
                    idMap.set(port.dataset.portId, `u${u2}-p${idx}`);
                    port.dataset.portId = `u${u2}-p${idx}`;
                });
                this.connections.forEach(c => {
                    if (idMap.has(c.from)) c.from = idMap.get(c.from);
                    if (idMap.has(c.to)) c.to = idMap.get(c.to);
                });
            },

            setupKeyboardDelete() {
                document.addEventListener('keydown', e => {
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                        if (document.activeElement.tagName === 'INPUT') return;
                        const selected = document.querySelector('.device.placed.selected');
                        if (selected) this.removeDevice(selected);
                    }
                });
            },

            setupGlobalControls() {
                document.getElementById('input-max-u').addEventListener('change', e => {
                    let val = parseInt(e.target.value);
                    if (isNaN(val) || val < 1) val = 1;
                    if (val > 16) val = 16;
                    e.target.value = val;
                    App.changeMaxU(val);
                });

                document.getElementById('btn-zoom-in').addEventListener('click', () => { if (this.currentZoom < 1.4) { this.currentZoom += 0.1; this.applyZoom(); } });
                document.getElementById('btn-zoom-out').addEventListener('click', () => { if (this.currentZoom > 0.6) { this.currentZoom -= 0.1; this.applyZoom(); } });
                document.getElementById('btn-zoom-reset').addEventListener('click', () => { this.currentZoom = 1.0; this.applyZoom(); });

                document.getElementById('btn-dark-mode').addEventListener('click', () => {
                    document.body.classList.toggle('dark-mode');
                    localStorage.setItem('unifi_rack_sim_dark', document.body.classList.contains('dark-mode'));
                });

                document.getElementById('btn-clear').addEventListener('click', () => {
                    if (confirm('Are you sure you want to clear the entire rack?')) {
                        document.querySelectorAll('.slot .device').forEach(d => d.remove());
                        this.connections = []; this.update();
                    }
                });

                document.getElementById('btn-export-png').addEventListener('click', () => this.exportPNG());
                document.getElementById('btn-export').addEventListener('click', () => this.exportReport());
            },

            applyZoom() {
                const wrapper = document.getElementById('rack-wrapper');
                wrapper.style.transform = `scale(${this.currentZoom})`;
                wrapper.style.transformOrigin = 'top center';
                this.requestRedraw();
            },

            changeMaxU(newMaxU) {
                if (newMaxU === this.maxU) return;
                const filtered = this.getRackState().filter(item => item.u <= newMaxU);
                this.maxU = newMaxU;
                const rackHeader = document.querySelector('.rack-header');
                if (rackHeader) rackHeader.textContent = `10" SOHO CABINET SYSTEM · ${newMaxU}U CAPACITY`;
                this.renderSlots(); this.setupDragAndDrop();
                this.applyState({ maxU: newMaxU, rack: filtered, connections: this.connections });
            },

            removeDevice(device) {
                device.querySelectorAll('.port-rj45').forEach(port => {
                    const pid = port.dataset.portId;
                    this.connections = this.connections.filter(c => c.from !== pid && c.to !== pid);
                });
                device.remove(); this.update();
            },

            update() {
                this.validateConnections();
                this.updateThermalMap();
                this.updatePowerMetrics();
                this.requestRedraw();
                this.updateReport();
                this.autoSave();
            },

            updatePowerMetrics() {},

            validateConnections() {
                this.connections = this.connections.filter(c => 
                    document.querySelector(`[data-port-id="${c.from}"]`) && document.querySelector(`[data-port-id="${c.to}"]`)
                );
            },

            requestRedraw() {
                if (this.redrawPending) return;
                this.redrawPending = true;
                requestAnimationFrame(() => {
                    this.redrawConnections();
                    this.redrawPending = false;
                });
            },

            redrawConnections() {
                const svg = document.getElementById('cable-svg');
                if (!svg) return;

                svg.querySelectorAll('path').forEach(p => p.remove());
                document.querySelectorAll('.slot .led').forEach(led => led.className = 'led');

                const activeDevices = this.getRackState();
                const activeOrganizers = [];
                activeDevices.forEach(d => {
                    if (d.type === 'brush-panel') {
                        activeOrganizers.push(d.u);
                    }
                });

                let stdCount = 0, xgCount = 0, wanCount = 0, sfpCount = 0, patchCount = 0, conflictCount = 0;

                this.connections.forEach((c, index) => {
                    const portA = document.querySelector(`[data-port-id="${c.from}"]`);
                    const portB = document.querySelector(`[data-port-id="${c.to}"]`);
                    if (!portA || !portB) return;

                    const ptA = getPortCenterInSVG(svg, portA);
                    const ptB = getPortCenterInSVG(svg, portB);

                    const x1 = ptA.x;
                    const y1 = ptA.y;
                    const x2 = ptB.x;
                    const y2 = ptB.y;

                    const dx = Math.abs(x2 - x1);
                    const dy = Math.abs(y2 - y1);
                    let sag = Math.max(dy, 60) + dx * 0.25;

                    let cp_x1 = x1;
                    let cp_x2 = x2;
                    let cp_y1 = y1 + sag;
                    let cp_y2 = y2 + sag;

                    if (dx < 40) {
                        const loopOffset = (40 - dx) * 0.8;
                        cp_x1 += loopOffset;
                        cp_x2 += loopOffset;
                    }

                    const uA = parseInt(c.from.split('-')[0].substring(1));
                    const uB = parseInt(c.to.split('-')[0].substring(1));
                    let matchedOrgY = null;

                    activeOrganizers.forEach(uOrg => {
                        if ((uA > uOrg && uOrg > uB) || (uB > uOrg && uOrg > uA)) {
                            const orgSlot = document.querySelector(`.slot[data-u="${uOrg}"]`);
                            if (orgSlot) {
                                const ptOrg = getPortCenterInSVG(svg, orgSlot);
                                matchedOrgY = ptOrg.y;
                            }
                        }
                    });

                    if (matchedOrgY !== null) {
                        cp_y1 = matchedOrgY;
                        cp_y2 = matchedOrgY;
                    }

                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const d = `M ${x1} ${y1} C ${cp_x1} ${cp_y1} ${cp_x2} ${cp_y2} ${x2} ${y2}`;

                    let cableColor = '#3b82f6';
                    const ptypeA = this.getPortType(c.from);
                    const ptypeB = this.getPortType(c.to);
                    const mediaA = PORT_MEDIA_TYPES[ptypeA];
                    const mediaB = PORT_MEDIA_TYPES[ptypeB];

                    if (mediaA !== 'any' && mediaB !== 'any' && mediaA !== mediaB) {
                        cableColor = 'var(--accent-red)'; conflictCount++;
                    } else if (ptypeA === 'sfp' || ptypeB === 'sfp') {
                        cableColor = 'var(--accent-sfp)'; sfpCount++;
                    } else if (ptypeA.startsWith('wan') || ptypeB.startsWith('wan')) {
                        cableColor = 'var(--accent-red)'; wanCount++;
                    } else if (ptypeA.includes('10g') || ptypeB.includes('10g')) {
                        cableColor = 'var(--accent-orange)'; xgCount++;
                    } else if (portA.closest('.device') && portB.closest('.device') &&
                               portA.closest('.device').getAttribute('data-type').startsWith('patch') &&
                               portB.closest('.device').getAttribute('data-type').startsWith('patch')) {
                        cableColor = '#cbd5e1'; patchCount++;
                    } else {
                        stdCount++;
                    }

                    path.setAttribute('id', `cable-${index}`);
                    path.setAttribute('class', 'cable-path');
                    path.setAttribute('d', d);
                    path.setAttribute('stroke', cableColor);
                    path.setAttribute('stroke-width', '2.8');
                    path.setAttribute('fill', 'none');
                    path.setAttribute('stroke-linecap', 'round');
                    path.setAttribute('filter', 'url(#cable-shadow)');
                    
                    svg.appendChild(path);
                    this.lightLED(portA); this.lightLED(portB);
                });

                document.getElementById('cable-count-badge').textContent = this.connections.length;
                document.getElementById('cnt-std').textContent = stdCount;
                document.getElementById('cnt-10g').textContent = xgCount;
                document.getElementById('cnt-wan').textContent = wanCount;
                document.getElementById('cnt-sfp').textContent = sfpCount;
                document.getElementById('cnt-patch').textContent = patchCount;
                document.getElementById('cnt-conflict').textContent = conflictCount;
            },

            getPortType(portId) {
                const parts = portId.split('-');
                const u = parseInt(parts[0].substring(1));
                const idx = parseInt(parts[1].substring(1));
                const slot = document.querySelector(`.slot[data-u="${u}"]`);
                if (!slot) return null;
                const dev = slot.querySelector('.device');
                if (!dev) return null;
                return DEVICE_TYPES[dev.getAttribute('data-type')].ports[idx];
            },

            lightLED(port) {
                const unit = port.closest('.switch-port-unit');
                if (!unit) return;
                const led = unit.querySelector('.led');
                if (!led) return;

                if (port.classList.contains('port-sfp')) led.className = 'led active-cyan blink-slow';
                else if (port.classList.contains('port-10g')) led.className = 'led active-orange blink';
                else if (port.classList.contains('port-poe')) led.className = 'led active-blue blink';
                else led.className = 'led active-green blink';
            },

            updateThermalMap() {
                document.querySelectorAll('.slot').forEach(slot => slot.classList.remove('thermal-hotspot'));
                for (let u = 1; u < this.maxU; u++) {
                    const dev1 = document.querySelector(`.slot[data-u="${u}"] .device`);
                    const dev2 = document.querySelector(`.slot[data-u="${u+1}"] .device`);
                    if (dev1 && dev2) {
                        const h1 = DEVICE_TYPES[dev1.getAttribute('data-type')].heatWeight || 0;
                        const h2 = DEVICE_TYPES[dev2.getAttribute('data-type')].heatWeight || 0;
                        if (h1 + h2 >= 6) {
                            document.querySelector(`.slot[data-u="${u}"]`).classList.add('thermal-hotspot');
                            document.querySelector(`.slot[data-u="${u+1}"]`).classList.add('thermal-hotspot');
                        }
                    }
                }
            },

            updateReport() {
                const container = document.getElementById('report-list');
                container.innerHTML = '';
                for (let u = this.maxU; u >= 1; u--) {
                    const device = document.querySelector(`.slot[data-u="${u}"] .device`);
                    const item = document.createElement('div');
                    item.className = 'report-item';
                    if (device) {
                        item.classList.add('occupied');
                        item.innerHTML = `<span class="u-badge">U${u}</span><span class="text-blue">${DEVICE_TYPES[device.getAttribute('data-type')].name}</span>`;
                    } else {
                        item.innerHTML = `<span class="u-badge text-muted">U${u}</span><span class="text-muted">(Empty)</span>`;
                    }
                    container.appendChild(item);
                }
            },

            getRackState() {
                const layout = [];
                for (let u = 1; u <= this.maxU; u++) {
                    const dev = document.querySelector(`.slot[data-u="${u}"] .device`);
                    if (dev) {
                        const labels = Array.from(dev.querySelectorAll('.port-label')).map(inp => inp.value);
                        layout.push({ u, type: dev.getAttribute('data-type'), labels });
                    }
                }
                return layout;
            },

            applyState(state) {
                this.maxU = state.maxU || 6;
                document.getElementById('input-max-u').value = this.maxU;
                const rackHeader = document.querySelector('.rack-header');
                if (rackHeader) rackHeader.textContent = `10" SOHO CABINET SYSTEM · ${this.maxU}U CAPACITY`;
                this.renderSlots(); this.setupDragAndDrop();

                document.querySelectorAll('.slot .device').forEach(d => d.remove());
                state.rack.forEach(item => {
                    const slot = document.querySelector(`.slot[data-u="${item.u}"]`);
                    if (slot) {
                        const dev = DeviceFactory.create(item.type, item.u);
                        slot.appendChild(dev);
                        if (item.labels) {
                            dev.querySelectorAll('.port-label').forEach((inp, idx) => inp.value = item.labels[idx] || '');
                        }
                    }
                });

                this.connections = state.connections;
                this.update();
            },

            autoSave() {
                localStorage.setItem('unifi_rack_sim_state_v2', JSON.stringify({ maxU: this.maxU, rack: this.getRackState(), connections: this.connections }));
            },

            loadFromStorage() {
                const raw = localStorage.getItem('unifi_rack_sim_state_v2');
                if (raw) {
                    try { this.applyState(JSON.parse(raw)); } catch(e) {}
                }
            },

            exportPNG() {
                const target = document.getElementById('rack-wrapper');
                const btn = document.getElementById('btn-export-png');
                if (!target) return;

                const originalText = btn.textContent;
                btn.textContent = '⏳ Generating Screenshot...';
                btn.disabled = true;

                document.querySelectorAll('.device.placed.selected').forEach(d => d.classList.remove('selected'));
                const savedTransform = target.style.transform;
                target.style.transform = 'none';

                const cabinet = target.querySelector('.rack-cabinet');
                const savedShadow = cabinet.style.boxShadow;
                cabinet.style.boxShadow = 'none';
                
                const svgCable = document.getElementById('cable-svg');
                svgCable.style.display = 'none';

                html2canvas(target, {
                    scale: 2,
                    backgroundColor: null,
                    useCORS: true,
                    logging: false
                }).then(canvas => {
                    const link = document.createElement('a');
                    const dateStr = new Date().toISOString().slice(0, 10);
                    link.download = `UniFi-10inch-Rack-${dateStr}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                }).catch(err => {
                    alert('Screenshot generation failed, please try again!');
                    console.error(err);
                }).finally(() => {
                    target.style.transform = savedTransform;
                    cabinet.style.boxShadow = savedShadow;
                    svgCable.style.display = 'block';
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
            },

            exportReport() {
                let report = `============ UniFi 10-Inch Matte White Rack Assembly Report (${this.maxU}U) ============
`;
                this.getRackState().reverse().forEach(r => {
                    report += `[U${r.u}] - ${DEVICE_TYPES[r.type].name}
`;
                });
                navigator.clipboard.writeText(report).then(() => alert('Report copied successfully!'));
            }
        };

        const Tooltip = {
            el: document.getElementById('global-tooltip'),
            show(e, ptype, uSlot, idx) {
                const spec = PORT_SPECS[ptype];
                if (!spec) return;

                let text = `<strong>${spec.title}</strong><br><span style="color:var(--accent-sfp);">${spec.speed}</span>`;
                if (uSlot) text = `[U${uSlot} Bay - Port ${idx+1}]<br>` + text;

                this.el.innerHTML = text;
                this.el.style.display = 'block';

                const rect = e.target.getBoundingClientRect();
                let left = rect.left + rect.width / 2;
                let top = rect.top;

                if (top < 80) {
                    this.el.classList.add('tooltip-bottom');
                    this.el.style.top = `${rect.bottom}px`;
                } else {
                    this.el.classList.remove('tooltip-bottom');
                    this.el.style.top = `${rect.top}px`;
                }

                left = Math.max(10, Math.min(window.innerWidth - 10, left));
                this.el.style.left = `${left}px`;
            },
            hide() { this.el.style.display = 'none'; }
        };

        const Toast = {
            el: document.getElementById('cable-toast'),
            show(msg) {
                this.el.textContent = msg; this.el.style.display = 'block';
                this.el.style.left = `${(window.innerWidth - this.el.offsetWidth) / 2}px`;
            },
            hide() { this.el.style.display = 'none'; }
        };

        window.addEventListener('DOMContentLoaded', () => App.init());
    </script>
</body>
</html>
