/**
 * device-library.js
 * -----------------------------------------------------------------------
 * UniFi 10-Inch Matte White Rack Simulator (PRO Edition) — Device Library
 *
 * This file contains all of the static device/catalog data used by the
 * rack simulator: device type definitions (DEVICE_TYPES), port metadata
 * (PORT_SPECS, PORT_MEDIA_TYPES), and the sidebar grouping (CATEGORIES).
 *
 * It must be loaded via a <script> tag BEFORE the main application script
 * in index.html, since that script reads these as global constants:
 *
 *   <script src="device-library.js"></script>
 *   <script> ... App code that references DEVICE_TYPES, etc ... </script>
 *
 * To add a new device: add an entry to DEVICE_TYPES, then reference its
 * key from one of the CATEGORIES groups so it shows up in the sidebar.
 * -----------------------------------------------------------------------
 */

const DEVICE_TYPES = {
    'blank': { name: '1U White Blank Panel', ports: [], uHeight: 1, tdp: 0, poeBudget: 0, heatWeight: 0 },
    'brush-panel': { name: '1U Brush Cable Management Panel', ports: [], uHeight: 1, tdp: 0, poeBudget: 0, heatWeight: 0 },

    'patch-8': { name: '8-Port White Patch Panel', ports: Array(8).fill('patch'), uHeight: 1, tdp: 0, poeBudget: 0, heatWeight: 0 },
    'patch-12': { name: '12-Port White Patch Panel', ports: Array(12).fill('patch'), uHeight: 1, tdp: 0, poeBudget: 0, heatWeight: 0 },

    /* 10" Hot-Swap HDD Storage Cages */
    'hdd-cage-1u-2x': { name: '1U 10" 2x 3.5" Hot-Swap HDD Cage (3D Mount)', ports: [], uHeight: 1, bracket: true, bracketWidth: 270, layout: 'hdd-cage-1u-2x', tdp: 15, poeBudget: 0, heatWeight: 3 },
    'hdd-cage-2u-6x': { name: '2U 10" 6x 3.5" Hot-Swap HDD Cage (3D Mount)', ports: [], uHeight: 2, bracket: true, bracketWidth: 270, layout: 'hdd-cage-2u-6x', tdp: 45, poeBudget: 0, heatWeight: 5 },
    'hdd-cage-3u-7x': { name: '3U 10" 7x 3.5" Hot-Swap HDD Cage (3D Mount)', ports: [], uHeight: 3, bracket: true, bracketWidth: 270, layout: 'hdd-cage-3u-7x', tdp: 55, poeBudget: 0, heatWeight: 6 },

    'usw-pro-xg-8-poe': { name: 'USW-Pro-XG-8-PoE (w/ 3D Bracket)', ports: [...Array(8).fill('10g-poe'), 'sfp', 'sfp'], uHeight: 1, bracket: true, bracketWidth: 220, tdp: 40, poeBudget: 200, heatWeight: 5 },
    'usw-lite-16-poe': { name: 'USW-Lite-16-PoE (w/ 3D Bracket)', ports: Array(16).fill('poe'), uHeight: 1, bracket: true, bracketWidth: 170, isGrid: true, tdp: 15, poeBudget: 45, heatWeight: 3 },
    'usw-lite-8-poe': { name: 'USW-Lite-8-PoE (w/ 3D Bracket)', ports: [...Array(4).fill('poe'), ...Array(4).fill('gbe')], uHeight: 1, bracket: true, bracketWidth: 170, tdp: 8, poeBudget: 52, heatWeight: 2 },
    'usw-flex-2.5g-8-poe': { name: 'USW-Flex-2.5G-8-PoE (w/ 3D Bracket)', ports: [...Array(8).fill('poe-2.5g'), '10g', 'sfp'], uHeight: 1, bracket: true, bracketWidth: 220, tdp: 12, poeBudget: 160, heatWeight: 3 },
    'usw-flex-2.5g-8': { name: 'USW-Flex-2.5G-8 (w/ 3D Bracket)', ports: [...Array(8).fill('2.5g'), '10g', 'sfp'], uHeight: 1, bracket: true, bracketWidth: 220, tdp: 12, poeBudget: 0, heatWeight: 3 },
    'usw-flex-2.5g-5': { name: 'USW-Flex-2.5G-5 (w/ 3D Bracket)', ports: ['poe-2.5g', ...Array(4).fill('2.5g')], uHeight: 1, bracket: true, bracketWidth: 120, tdp: 8, poeBudget: 0, heatWeight: 2, poeIn: true },
    'usw-flex-mini': { name: 'USW-Flex-Mini (w/ 3D Bracket)', ports: ['poe-gbe', ...Array(4).fill('gbe')], uHeight: 1, bracket: true, bracketWidth: 120, tdp: 2.5, poeBudget: 0, heatWeight: 1, poeIn: true },
    'usw-flex': { name: 'USW-Flex (w/ 3D Bracket)', ports: Array(5).fill('poe-gbe'), uHeight: 1, bracket: true, bracketWidth: 125, tdp: 5, poeBudget: 46, heatWeight: 2, poeIn: true },
    'usw-flex-xg': { name: 'USW-Flex-XG (w/ 3D Bracket)', ports: ['poe-gbe', ...Array(4).fill('10g')], uHeight: 1, bracket: true, bracketWidth: 130, tdp: 15, poeBudget: 0, heatWeight: 4, poeIn: true },
    'ucg-max': { name: 'Cloud Gateway Max (UCG-Max)', ports: ['wan-2.5g', ...Array(4).fill('2.5g')], uHeight: 1, hasScreen: true, bracket: true, bracketWidth: 180, layout: 'ucg-max', tdp: 16, poeBudget: 0, heatWeight: 3 },
    'ucg-ultra': { name: 'Cloud Gateway Ultra (UCG-Ultra)', ports: [...Array(4).fill('gbe'), 'wan-2.5g'], uHeight: 1, hasScreen: true, bracket: true, bracketWidth: 180, layout: 'ucg-ultra', tdp: 10, poeBudget: 0, heatWeight: 2 },
    'ucg-fiber': { name: 'Cloud Gateway Fiber (UCG-Fiber)', ports: [...Array(3).fill('2.5g'), 'poe-2.5g', 'wan-10g', 'sfp', 'sfp'], uHeight: 1, hasScreen: true, bracket: true, bracketWidth: 220, layout: 'ucg-fiber', tdp: 18, poeBudget: 0, heatWeight: 4 },
    'ux7': { name: 'UniFi Express 7 (UX7)', ports: ['2.5g', 'wan-10g'], uHeight: 1, hasScreen: true, bracket: true, bracketWidth: 140, layout: 'ux7', tdp: 15, poeBudget: 0, heatWeight: 3 },
    'uck-g2-plus': { name: 'CloudKey Gen2 Plus (UCK-G2-PLUS w/ 3D Bracket)', ports: ['poe-gbe'], uHeight: 1, hasScreen: true, bracket: true, bracketWidth: 140, layout: 'uck-g2-plus', tdp: 10, poeBudget: 0, heatWeight: 2, poeIn: true },
    'unvr-instant': { name: 'Network Video Recorder Instant (UNVR-Instant w/ 3D Bracket)', ports: [...Array(6).fill('poe'), 'gbe'], uHeight: 1, hasScreen: true, bracket: true, bracketWidth: 250, layout: 'unvr-instant', tdp: 25, poeBudget: 45, heatWeight: 3 },
    'rapidanalysis-xerxes-6x': { name: 'Rapid Analysis Xerxes Pi 6x Blade Cluster (1U 3D Rack)', ports: Array(6).fill('poe-gbe'), uHeight: 1, bracket: true, bracketWidth: 270, layout: 'rapidanalysis-xerxes', tdp: 45, poeBudget: 0, heatWeight: 3 },
    'raspberry-pi-4b-2x': { name: '2x Raspberry Pi 4B Side-by-Side Cluster (1U 3D Mount)', ports: ['poe', 'poe'], uHeight: 1, bracket: true, bracketWidth: 270, layout: 'raspberry-pi-cluster', tdp: 15, poeBudget: 0, heatWeight: 2 },

    /* Servers & Mini PCs */
    'dell-optiplex-micro': { name: 'Dell OptiPlex Micro PC (1U 3D Mount)', ports: ['poe', '2.5g'], uHeight: 1, bracket: true, bracketWidth: 235, layout: 'dell-optiplex', tdp: 35, poeBudget: 0, heatWeight: 4 },
    'nvidia-dgx-spark': { name: 'NVIDIA DGX Spark Grace Blackwell (2U 10" 3D Mount)', ports: [], uHeight: 2, bracket: true, bracketWidth: 270, layout: 'nvidia-dgx-spark', tdp: 240, poeBudget: 0, heatWeight: 8 },
    'apple-mac-mini-m4': { name: 'Apple Mac Mini M4 (2U 10" 3D Mount)', ports: ['10g'], uHeight: 2, bracket: true, bracketWidth: 220, layout: 'mac-mini-m4', tdp: 20, poeBudget: 0, heatWeight: 2 },
    'minisforum-nab9': { name: 'Minisforum NAB9 (2U 10" 3D Mount)', ports: ['poe'], uHeight: 2, bracket: true, bracketWidth: 220, layout: 'minisforum-nab9', tdp: 28, poeBudget: 0, heatWeight: 3 },
    'diy-matx-motherboard': { name: 'DIY Micro ATX Motherboard (3U 3D Mount)', ports: ['poe'], uHeight: 3, bracket: true, bracketWidth: 260, layout: 'diy-matx-motherboard', tdp: 65, poeBudget: 0, heatWeight: 5 },

    /* Miscellaneous */
    'jetkvm': { name: 'JetKVM (1U 3D Mount)', ports: ['poe'], uHeight: 1, bracket: true, bracketWidth: 140, layout: 'jetkvm', tdp: 5, poeBudget: 0, heatWeight: 1 }
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
    { title: '📂 0.5U & 1U Cable Management Panels', types: ['blank', 'brush-panel'] },
    { title: '🔌 Patch Panels', types: ['patch-8', 'patch-12'] },
    { title: '💾 10" Hot-Swap HDD Storage Cages (3D Mount)', types: ['hdd-cage-1u-2x', 'hdd-cage-2u-6x', 'hdd-cage-3u-7x'] },
    { title: '⚡ UniFi Network Switches', types: ['usw-pro-xg-8-poe', 'usw-lite-16-poe', 'usw-lite-8-poe', 'usw-flex-2.5g-8-poe', 'usw-flex-2.5g-8', 'usw-flex-2.5g-5', 'usw-flex-mini', 'usw-flex', 'usw-flex-xg'] },
    { title: '🌐 Routers & Gateways', types: ['ucg-max', 'ucg-ultra', 'ucg-fiber', 'ux7'] },
    { title: '📹 UniFi Consoles & Protect NVR', types: ['uck-g2-plus', 'unvr-instant'] },
    { title: '🍓 Cluster & Blade Racks (Rapid Analysis)', types: ['rapidanalysis-xerxes-6x', 'raspberry-pi-4b-2x'] },
    { title: '💻 Servers, Mini PCs & AI (Dell / NVIDIA)', types: ['dell-optiplex-micro', 'nvidia-dgx-spark', 'apple-mac-mini-m4', 'minisforum-nab9', 'diy-matx-motherboard'] },
    { title: '⚙️Miscellaneous', types: ['jetkvm'] }
];
