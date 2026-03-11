const targetText = document.getElementById('target-text');
const controlsContainer = document.getElementById('controls-container');
const cssOutput = document.getElementById('css-output');
const copyBtn = document.getElementById('copy-btn');
const resetBtn = document.getElementById('reset-btn');
const fontSearch = document.getElementById('font-search');
const fontListContainer = document.getElementById('font-list');
const selectedFontName = document.getElementById('selected-font-name');
const selectedFontCategory = document.getElementById('selected-font-category');
const fontCount = document.getElementById('font-count');
const fontDropdown = document.getElementById('font-dropdown');
const fontsizeSlider = document.getElementById('fontsize-slider');
const fontsizeVal = document.getElementById('val-fontsize');
const canvasDropZone = document.getElementById('canvas-drop-zone');
const dropHint = document.getElementById('drop-hint');

/**
 * Complete Variable Font Catalog
 * Each font includes: Google Fonts URL params, category, and supported axes
 */
const fontCatalog = [
    {
        name: 'Roboto Flex',
        category: 'Sans Serif',
        googleParam: 'Roboto+Flex:opsz,slnt,wdth,wght@8..144,-10..0,25..151,100..1000',
        axes: [
            { tag: 'opsz', name: 'Optical Size', min: 8, max: 144, default: 14, step: 0.1 },
            { tag: 'slnt', name: 'Slant', min: -10, max: 0, default: 0, step: 0.1 },
            { tag: 'wdth', name: 'Width', min: 25, max: 151, default: 100, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 100, max: 1000, default: 400, step: 1 }
        ]
    },
    {
        name: 'Inter',
        category: 'Sans Serif',
        googleParam: 'Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900',
        axes: [
            { tag: 'opsz', name: 'Optical Size', min: 14, max: 32, default: 14, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Open Sans',
        category: 'Sans Serif',
        googleParam: 'Open+Sans:wdth,wght@75..100,300..800',
        axes: [
            { tag: 'wdth', name: 'Width', min: 75, max: 100, default: 100, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 300, max: 800, default: 400, step: 1 }
        ]
    },
    {
        name: 'Fraunces',
        category: 'Serif',
        googleParam: 'Fraunces:opsz,SOFT,wght,WONK@9..144,0..100,100..900,0..1',
        axes: [
            { tag: 'opsz', name: 'Optical Size', min: 9, max: 144, default: 72, step: 0.1 },
            { tag: 'SOFT', name: 'Softness', min: 0, max: 100, default: 50, step: 1 },
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 },
            { tag: 'WONK', name: 'Wonky', min: 0, max: 1, default: 0, step: 1 }
        ]
    },
    {
        name: 'Montserrat',
        category: 'Sans Serif',
        googleParam: 'Montserrat:ital,wght@0,100..900;1,100..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Oswald',
        category: 'Sans Serif',
        googleParam: 'Oswald:wght@200..700',
        axes: [
            { tag: 'wght', name: 'Weight', min: 200, max: 700, default: 400, step: 1 }
        ]
    },
    {
        name: 'Raleway',
        category: 'Sans Serif',
        googleParam: 'Raleway:ital,wght@0,100..900;1,100..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Nunito',
        category: 'Sans Serif',
        googleParam: 'Nunito:ital,wght@0,200..1000;1,200..1000',
        axes: [
            { tag: 'wght', name: 'Weight', min: 200, max: 1000, default: 400, step: 1 }
        ]
    },
    {
        name: 'Poppins',
        category: 'Sans Serif',
        googleParam: 'Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 100 }
        ]
    },
    {
        name: 'Source Sans 3',
        category: 'Sans Serif',
        googleParam: 'Source+Sans+3:ital,wght@0,200..900;1,200..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 200, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Work Sans',
        category: 'Sans Serif',
        googleParam: 'Work+Sans:ital,wght@0,100..900;1,100..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Lora',
        category: 'Serif',
        googleParam: 'Lora:ital,wght@0,400..700;1,400..700',
        axes: [
            { tag: 'wght', name: 'Weight', min: 400, max: 700, default: 400, step: 1 }
        ]
    },
    {
        name: 'Playfair Display',
        category: 'Serif',
        googleParam: 'Playfair+Display:ital,wght@0,400..900;1,400..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 400, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Merriweather',
        category: 'Serif',
        googleParam: 'Merriweather:ital,wdth,wght@0,75..100,300..900;1,75..100,300..900',
        axes: [
            { tag: 'wdth', name: 'Width', min: 75, max: 100, default: 100, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 300, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'EB Garamond',
        category: 'Serif',
        googleParam: 'EB+Garamond:ital,wght@0,400..800;1,400..800',
        axes: [
            { tag: 'wght', name: 'Weight', min: 400, max: 800, default: 400, step: 1 }
        ]
    },
    {
        name: 'Crimson Pro',
        category: 'Serif',
        googleParam: 'Crimson+Pro:ital,wght@0,200..900;1,200..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 200, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Bitter',
        category: 'Serif',
        googleParam: 'Bitter:ital,wght@0,100..900;1,100..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Josefin Sans',
        category: 'Sans Serif',
        googleParam: 'Josefin+Sans:ital,wght@0,100..700;1,100..700',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 700, default: 400, step: 1 }
        ]
    },
    {
        name: 'DM Sans',
        category: 'Sans Serif',
        googleParam: 'DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000',
        axes: [
            { tag: 'opsz', name: 'Optical Size', min: 9, max: 40, default: 14, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 100, max: 1000, default: 400, step: 1 }
        ]
    },
    {
        name: 'Cabin',
        category: 'Sans Serif',
        googleParam: 'Cabin:ital,wdth,wght@0,75..100,400..700;1,75..100,400..700',
        axes: [
            { tag: 'wdth', name: 'Width', min: 75, max: 100, default: 100, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 400, max: 700, default: 400, step: 1 }
        ]
    },
    {
        name: 'Recursive',
        category: 'Monospace',
        googleParam: 'Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1',
        axes: [
            { tag: 'slnt', name: 'Slant', min: -15, max: 0, default: 0, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 300, max: 1000, default: 400, step: 1 },
            { tag: 'CASL', name: 'Casual', min: 0, max: 1, default: 0, step: 0.01 },
            { tag: 'CRSV', name: 'Cursive', min: 0, max: 1, default: 0.5, step: 0.01 },
            { tag: 'MONO', name: 'Monospace', min: 0, max: 1, default: 1, step: 0.01 }
        ]
    },
    {
        name: 'JetBrains Mono',
        category: 'Monospace',
        googleParam: 'JetBrains+Mono:ital,wght@0,100..800;1,100..800',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 800, default: 400, step: 1 }
        ]
    },
    {
        name: 'Fira Code',
        category: 'Monospace',
        googleParam: 'Fira+Code:wght@300..700',
        axes: [
            { tag: 'wght', name: 'Weight', min: 300, max: 700, default: 400, step: 1 }
        ]
    },
    {
        name: 'Archivo',
        category: 'Sans Serif',
        googleParam: 'Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900',
        axes: [
            { tag: 'wdth', name: 'Width', min: 62, max: 125, default: 100, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Libre Franklin',
        category: 'Sans Serif',
        googleParam: 'Libre+Franklin:ital,wght@0,100..900;1,100..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Rubik',
        category: 'Sans Serif',
        googleParam: 'Rubik:ital,wght@0,300..900;1,300..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 300, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Sora',
        category: 'Sans Serif',
        googleParam: 'Sora:wght@100..800',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 800, default: 400, step: 1 }
        ]
    },
    {
        name: 'Outfit',
        category: 'Sans Serif',
        googleParam: 'Outfit:wght@100..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Space Grotesk',
        category: 'Sans Serif',
        googleParam: 'Space+Grotesk:wght@300..700',
        axes: [
            { tag: 'wght', name: 'Weight', min: 300, max: 700, default: 400, step: 1 }
        ]
    },
    {
        name: 'Lexend',
        category: 'Sans Serif',
        googleParam: 'Lexend:wght@100..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Figtree',
        category: 'Sans Serif',
        googleParam: 'Figtree:ital,wght@0,300..900;1,300..900',
        axes: [
            { tag: 'wght', name: 'Weight', min: 300, max: 900, default: 400, step: 1 }
        ]
    },
    {
        name: 'Geologica',
        category: 'Sans Serif',
        googleParam: 'Geologica:slnt,wght,CRSV,SHRP@-6..0,100..900,0..1,0..100',
        axes: [
            { tag: 'slnt', name: 'Slant', min: -6, max: 0, default: 0, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 },
            { tag: 'CRSV', name: 'Cursive', min: 0, max: 1, default: 0, step: 0.01 },
            { tag: 'SHRP', name: 'Sharpness', min: 0, max: 100, default: 0, step: 1 }
        ]
    },
    {
        name: 'Newsreader',
        category: 'Serif',
        googleParam: 'Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800',
        axes: [
            { tag: 'opsz', name: 'Optical Size', min: 6, max: 72, default: 14, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 200, max: 800, default: 400, step: 1 }
        ]
    },
    {
        name: 'Commissioner',
        category: 'Sans Serif',
        googleParam: 'Commissioner:slnt,wght,FLAR,VOLM@-12..0,100..900,0..100,0..100',
        axes: [
            { tag: 'slnt', name: 'Slant', min: -12, max: 0, default: 0, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 400, step: 1 },
            { tag: 'FLAR', name: 'Flare', min: 0, max: 100, default: 0, step: 1 },
            { tag: 'VOLM', name: 'Volume', min: 0, max: 100, default: 0, step: 1 }
        ]
    },
    {
        name: 'Literata',
        category: 'Serif',
        googleParam: 'Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900',
        axes: [
            { tag: 'opsz', name: 'Optical Size', min: 7, max: 72, default: 14, step: 0.1 },
            { tag: 'wght', name: 'Weight', min: 200, max: 900, default: 400, step: 1 }
        ]
    }
];

// State
let currentFont = fontCatalog[0];
let currentSettings = {};
let isDropdownOpen = false;
const loadedFonts = new Set();

/**
 * Load a Google Font dynamically by injecting a <link> tag
 */
function loadGoogleFont(font) {
    if (loadedFonts.has(font.name)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleParam}&display=swap`;
    document.head.appendChild(link);
    loadedFonts.add(font.name);
}

/**
 * Render the font list inside the dropdown
 */
function renderFontList(filter = '') {
    const filterLower = filter.toLowerCase();
    const filtered = fontCatalog.filter(f =>
        f.name.toLowerCase().includes(filterLower) ||
        f.category.toLowerCase().includes(filterLower)
    );

    fontCount.textContent = `${filtered.length} of ${fontCatalog.length}`;

    fontListContainer.innerHTML = '';

    if (filtered.length === 0) {
        fontListContainer.innerHTML = `<p class="text-xs opacity-30 text-center py-8">No fonts found</p>`;
        return;
    }

    // Group by category
    const grouped = {};
    filtered.forEach(f => {
        if (!grouped[f.category]) grouped[f.category] = [];
        grouped[f.category].push(f);
    });

    Object.entries(grouped).forEach(([category, fonts]) => {
        const categoryHeader = document.createElement('p');
        categoryHeader.className = 'text-[9px] uppercase tracking-widest font-black opacity-20 px-3 pt-5 pb-1';
        categoryHeader.textContent = category;
        fontListContainer.appendChild(categoryHeader);

        fonts.forEach(font => {
            const item = document.createElement('button');
            item.className = `w-full text-left px-3 py-2.5 flex justify-between items-center hover:bg-black/5 rounded-lg transition-colors ${font.name === currentFont.name ? 'bg-black/5 font-bold' : ''}`;
            item.innerHTML = `
                <span class="text-sm truncate" style="font-family: '${font.name}', sans-serif;">${font.name}</span>
                <span class="text-[9px] font-mono opacity-30 ml-2 shrink-0">${font.axes.length} axis</span>
            `;
            item.addEventListener('click', () => {
                // Improvement 6: fade transition
                targetText.style.opacity = '0';
                setTimeout(() => {
                    selectFont(font);
                    targetText.style.opacity = '1';
                }, 150);
            });
            fontListContainer.appendChild(item);
        });
    });
}

/**
 * Toggle dropdown visibility
 */
function toggleDropdown(forceState) {
    isDropdownOpen = forceState !== undefined ? forceState : !isDropdownOpen;
    fontDropdown.classList.toggle('hidden', !isDropdownOpen);

    if (isDropdownOpen) {
        fontSearch.value = '';
        renderFontList();
        fontSearch.focus();
    }
}

/**
 * Select a font from the list
 */
function selectFont(font) {
    currentFont = font;
    loadGoogleFont(font);
    selectedFontName.textContent = font.name;
    selectedFontCategory.textContent = `${font.category} · ${font.axes.length} axes`;
    toggleDropdown(false);
    // Reset any inline weight/style from previous font
    targetText.style.fontWeight = '';
    targetText.style.fontStyle = '';
    createSliders();
}

/**
 * Build sliders for the currently selected font
 */
function createSliders() {
    controlsContainer.innerHTML = '';
    currentSettings = {};

    currentFont.axes.forEach(axis => {
        currentSettings[axis.tag] = axis.default;

        const wrapper = document.createElement('div');
        wrapper.className = 'group/slider space-y-3';

        wrapper.innerHTML = `
            <div class="flex justify-between items-end">
                <div class="space-y-0.5">
                    <label class="block text-[10px] font-black uppercase tracking-[0.2em] opacity-50 group-hover/slider:opacity-100 transition-opacity whitespace-nowrap">${axis.name}</label>
                    <p class="text-[9px] font-mono opacity-20">${axis.tag}</p>
                </div>
                <span class="font-mono text-xs tabular-nums opacity-60" id="val-${axis.tag}">${axis.default}</span>
            </div>
            <input type="range"
                   min="${axis.min}"
                   max="${axis.max}"
                   step="${axis.step}"
                   value="${axis.default}"
                   class="w-full"
                   data-tag="${axis.tag}">
        `;

        const input = wrapper.querySelector('input');
        const display = wrapper.querySelector(`#val-${axis.tag}`);

        input.addEventListener('input', (e) => {
            const val = e.target.value;
            currentSettings[axis.tag] = val;
            display.textContent = parseFloat(val) % 1 === 0 ? parseInt(val) : parseFloat(val).toFixed(1);
            updateStyles();
        });

        controlsContainer.appendChild(wrapper);
    });

    updateStyles();
}

/**
 * Sync font-variation-settings to the text target and code panel
 */
function updateStyles() {
    const entries = Object.entries(currentSettings);
    const settingsString = entries.map(([tag, val]) => `'${tag}' ${val}`).join(', ');

    // Display name: for uploaded fonts show the real name, otherwise use internal name
    const displayName = currentFont.displayName || currentFont.name;

    targetText.style.fontFamily = `'${currentFont.name}', sans-serif`;

    // Apply font-variation-settings for variable axes
    targetText.style.fontVariationSettings = settingsString || 'normal';

    // Also apply font-weight/style directly so static fonts respond too
    const wght = currentSettings['wght'];
    const ital = currentSettings['ital'];
    if (wght !== undefined) targetText.style.fontWeight = wght;
    if (ital !== undefined) targetText.style.fontStyle = parseFloat(ital) >= 0.5 ? 'italic' : 'normal';

    // Build CSS export
    let cssLines = [`  font-family: '${displayName}', sans-serif;`];
    if (settingsString) cssLines.push(`  font-variation-settings: ${settingsString};`);
    if (wght !== undefined) cssLines.push(`  font-weight: ${wght};`);

    const cssContent = `/* Typography Configuration */
.variable-text {
${cssLines.join('\n')}
}`;
    cssOutput.textContent = cssContent;

    // Improvement 5: keep URL in sync (syncUrl defined later)
    if (typeof syncUrl === 'function') syncUrl();
}

// --- Event Listeners ---

// Font Selector Toggle
document.getElementById('font-selector-btn').addEventListener('click', () => toggleDropdown());

// Search Filter
fontSearch.addEventListener('input', (e) => renderFontList(e.target.value));

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const selectorArea = document.getElementById('font-selector-area');
    if (isDropdownOpen && !selectorArea.contains(e.target)) {
        toggleDropdown(false);
    }
});

// Keyboard navigation for search
fontSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleDropdown(false);
});

// Reset
resetBtn.addEventListener('click', () => createSliders());

// Copy CSS (button)
async function copyCss() {
    try {
        await navigator.clipboard.writeText(cssOutput.textContent);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'COPIED!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    } catch (err) {
        console.error('Copy failed', err);
    }
}
copyBtn.addEventListener('click', copyCss);

// --- Improvement 1: Font Size Slider ---
fontsizeSlider.addEventListener('input', () => {
    const size = fontsizeSlider.value;
    fontsizeVal.textContent = size;
    targetText.style.fontSize = `${size}px`;
    syncUrl();
});

// --- Improvement 3: Drag & Drop Font Upload ---
canvasDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropHint.style.display = 'flex';
});
canvasDropZone.addEventListener('dragleave', (e) => {
    if (!canvasDropZone.contains(e.relatedTarget)) {
        dropHint.style.display = 'none';
    }
});
canvasDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropHint.style.display = 'none';
    const file = e.dataTransfer.files[0];
    if (file && /\.(otf|ttf|woff|woff2)$/i.test(file.name)) {
        handleFontFile(file);
    }
});

// --- Improvement 4: Ctrl+Shift+C Keyboard Shortcut ---
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyCss();
    }
});

// --- Improvement 5: URL Sharing ---
function syncUrl() {
    const params = new URLSearchParams();
    // Font name (use displayName if uploaded, otherwise internal)
    const fontParam = currentFont.displayName || currentFont.name;
    params.set('font', fontParam);
    // Axis values
    Object.entries(currentSettings).forEach(([tag, val]) => params.set(tag, val));
    // Font size
    params.set('size', fontsizeSlider.value);
    // Update URL without reloading
    window.history.replaceState({}, '', `?${params.toString()}`);
}

function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('font')) return;

    const fontName = params.get('font');
    const matchedFont = fontCatalog.find(f => f.name === fontName);
    if (matchedFont) {
        selectFont(matchedFont);
        // Restore axis values after sliders are created
        params.forEach((val, key) => {
            if (key === 'font' || key === 'size') return;
            const input = controlsContainer.querySelector(`[data-tag="${key}"]`);
            const display = controlsContainer.querySelector(`#val-${key}`);
            if (input) {
                input.value = val;
                currentSettings[key] = val;
                if (display) display.textContent = parseFloat(val) % 1 === 0 ? parseInt(val) : parseFloat(val).toFixed(1);
            }
        });
        updateStyles();
    }

    // Restore font size
    if (params.has('size')) {
        const size = parseInt(params.get('size'));
        fontsizeSlider.value = size;
        fontsizeVal.textContent = size;
        targetText.style.fontSize = `${size}px`;
    }
}

// --- Improvement 6: Font switch fade transition ---
// Wrap selectFont with fade animation
const _selectFontOriginal = selectFont;
function selectFontAnimated(font) {
    targetText.style.opacity = '0';
    setTimeout(() => {
        _selectFontOriginal(font);
        targetText.style.opacity = '1';
    }, 150);
}
// Override the dropdown click handler through the toggle
document.getElementById('font-selector-btn').removeEventListener('click', () => toggleDropdown());
// We patch renderFontList so new items call selectFontAnimated
const _renderFontListOriginal = renderFontList;
// Monkey-patch selectFont globally
window._selectFontAnimated = selectFontAnimated;

// --- Dark Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

function setTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    iconSun.classList.toggle('hidden', !isDark);
    iconMoon.classList.toggle('hidden', isDark);
    localStorage.setItem('typemorph-theme', isDark ? 'dark' : 'light');
}

// Init theme from localStorage or system preference
const savedTheme = localStorage.getItem('typemorph-theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
}

themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
});

// --- Custom Font Upload ---
const fontUpload = document.getElementById('font-upload');

/**
 * Parse OpenType/TrueType font binary to extract fvar (variable axes) and name tables
 */
function parseFontBinary(buffer) {
    const data = new DataView(buffer);
    let offset = 0;

    // Read offset table
    const sfVersion = data.getUint32(0);
    const numTables = data.getUint16(4);
    offset = 12; // skip header

    // Find table directory entries
    const tables = {};
    for (let i = 0; i < numTables; i++) {
        const tag = String.fromCharCode(
            data.getUint8(offset), data.getUint8(offset + 1),
            data.getUint8(offset + 2), data.getUint8(offset + 3)
        );
        tables[tag] = {
            checksum: data.getUint32(offset + 4),
            offset: data.getUint32(offset + 8),
            length: data.getUint32(offset + 12)
        };
        offset += 16;
    }

    // Parse name table for human-readable names
    const names = {};
    if (tables['name']) {
        const nameOffset = tables['name'].offset;
        const nameFormat = data.getUint16(nameOffset);
        const nameCount = data.getUint16(nameOffset + 2);
        const stringOffset = nameOffset + data.getUint16(nameOffset + 4);

        for (let i = 0; i < nameCount; i++) {
            const recOffset = nameOffset + 6 + i * 12;
            const platformID = data.getUint16(recOffset);
            const encodingID = data.getUint16(recOffset + 2);
            const nameID = data.getUint16(recOffset + 6);
            const strLength = data.getUint16(recOffset + 8);
            const strOffset = stringOffset + data.getUint16(recOffset + 10);

            // Prefer Windows (platformID 3) or Mac (platformID 1)
            if (!names[nameID] || platformID === 3) {
                try {
                    if (platformID === 3) {
                        // Windows: UTF-16BE
                        let str = '';
                        for (let j = 0; j < strLength; j += 2) {
                            str += String.fromCharCode(data.getUint16(strOffset + j));
                        }
                        names[nameID] = str;
                    } else if (platformID === 1) {
                        // Mac: single byte
                        let str = '';
                        for (let j = 0; j < strLength; j++) {
                            str += String.fromCharCode(data.getUint8(strOffset + j));
                        }
                        if (!names[nameID]) names[nameID] = str;
                    }
                } catch (e) {
                    // Skip malformed name records
                }
            }
        }
    }

    // Get font family name
    const fontName = names[1] || names[4] || 'Custom Font';

    // Parse fvar table for variable axes
    const axes = [];
    if (tables['fvar']) {
        const fvarOffset = tables['fvar'].offset;
        const axesArrayOffset = data.getUint16(fvarOffset + 4);
        const axisCount = data.getUint16(fvarOffset + 8);
        const axisSize = data.getUint16(fvarOffset + 10);

        for (let i = 0; i < axisCount; i++) {
            const axisOffset = fvarOffset + axesArrayOffset + i * axisSize;
            const tag = String.fromCharCode(
                data.getUint8(axisOffset), data.getUint8(axisOffset + 1),
                data.getUint8(axisOffset + 2), data.getUint8(axisOffset + 3)
            );
            // Fixed 16.16 format
            const minValue = data.getInt32(axisOffset + 4) / 65536;
            const defaultValue = data.getInt32(axisOffset + 8) / 65536;
            const maxValue = data.getInt32(axisOffset + 12) / 65536;
            const nameID = data.getUint16(axisOffset + 18);

            // Look up the axis name from the name table
            const axisName = names[nameID] || tag;

            // Determine step based on value range
            const range = maxValue - minValue;
            let step = 1;
            if (range <= 2) step = 0.01;
            else if (range <= 10) step = 0.1;
            else if (range <= 100) step = 0.5;

            axes.push({
                tag,
                name: axisName,
                min: Math.round(minValue * 100) / 100,
                max: Math.round(maxValue * 100) / 100,
                default: Math.round(defaultValue * 100) / 100,
                step
            });
        }
    }

    return { fontName, axes };
}

/**
 * Handle custom font file upload (shared by button input and drag-drop)
 */
async function handleFontFile(file) {
    try {
        const buffer = await file.arrayBuffer();
        const { fontName, axes } = parseFontBinary(buffer);

        const isVariable = axes.length > 0;

        // Register the font via FontFace API
        const blobUrl = URL.createObjectURL(file);
        const customFontName = `Custom-${fontName.replace(/\s+/g, '-')}`;

        const fontFace = new FontFace(customFontName, `url(${blobUrl})`);
        await fontFace.load();
        document.fonts.add(fontFace);

        currentFont = {
            name: customFontName,
            displayName: fontName,
            category: 'Uploaded',
            googleParam: null,
            isVariable,
            axes
        };

        selectedFontName.textContent = fontName;
        selectedFontCategory.textContent = isVariable
            ? `Uploaded Variable · ${axes.length} ${axes.length === 1 ? 'axis' : 'axes'}`
            : `Uploaded · Static font`;
        toggleDropdown(false);

        // Fade in
        targetText.style.opacity = '0';
        setTimeout(() => { targetText.style.opacity = '1'; }, 150);

        targetText.style.fontWeight = '';
        targetText.style.fontStyle = '';
        targetText.style.fontFamily = `'${customFontName}', sans-serif`;
        targetText.style.fontVariationSettings = 'normal';

        if (isVariable) {
            createSliders();
        } else {
            controlsContainer.innerHTML = `
                <div class="space-y-3 p-4 rounded-xl" style="background: var(--slider-track);">
                    <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">⚠ Static Font</p>
                    <p class="text-xs opacity-40 leading-relaxed">
                        <strong>${fontName}</strong> is a static font — it has no variable axes to control.<br><br>
                        To get sliders, upload a <strong>variable version</strong> (.ttf/.otf) which contains an <code class="font-mono text-[10px]">fvar</code> table.
                    </p>
                    <a href="https://fonts.google.com/?vfonly=true" target="_blank" rel="noopener noreferrer"
                       class="inline-block text-[10px] font-bold uppercase tracking-widest underline underline-offset-2 opacity-50 hover:opacity-80 transition-opacity">
                        Browse variable fonts →
                    </a>
                </div>
            `;
            currentSettings = {};
            cssOutput.textContent = `/* Static Font — no variable axes */\n.text {\n  font-family: '${fontName}', sans-serif;\n}`;
        }

    } catch (err) {
        console.error('Font parse error:', err);
        alert('Could not parse this font file. Please try a different .otf or .ttf file.');
    }
}

fontUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) await handleFontFile(file);
    fontUpload.value = '';
});

// --- Init ---
loadGoogleFont(currentFont);
selectFont(currentFont);
loadFromUrl();