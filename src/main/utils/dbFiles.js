const { getCurrentDB, run, get, all, ensureBaseTables } = require('./db');

async function ensureFileColumns(db = getCurrentDB()) {
    try {
        const cols = await all(db, 'PRAGMA table_info(files)');
        const have = (n) => cols.some(c => c.name === n);
        const alters = [];
        
        console.log('Current files table columns:', cols.map(c => c.name));
        
        if (!have('original_name')) alters.push('ALTER TABLE files ADD COLUMN original_name TEXT');
        if (!have('hash')) alters.push('ALTER TABLE files ADD COLUMN hash TEXT');
        if (!have('added_date')) alters.push('ALTER TABLE files ADD COLUMN added_date TEXT');
        
        for (const sql of alters) {
            console.log('Adding column:', sql);
            await run(db, sql);
        }
        
        console.log('Files table migration completed');
    } catch (error) {
        console.error('Error ensuring file columns:', error);
        throw error;
    }
}

function mapFileType(filename = '') {
    const lower = filename.toLowerCase();

    if (/\.(png|jpe?g|gif|webp|bmp|tiff?|svg|heic|heif|ico)$/.test(lower)) return 'Image';
    if (/\.(mp4|m4v|mkv|mov|avi|wmv|flv|webm|mpeg|mpg|3gp)$/.test(lower)) return 'Video';
    if (/\.(mp3|wav|flac|aac|ogg|m4a|wma|opus)$/.test(lower)) return 'Audio';
    if (/\.(zip|rar|7z|tar|gz|bz2|xz|tgz|iso|dmg)$/.test(lower)) return 'Archive';
    if (/\.(txt|md|rtf|log)$/.test(lower)) return 'Text';
    if (/\.(pdf)$/.test(lower)) return 'PDF';
    if (/\.(docx?|odt|rtf)$/.test(lower)) return 'Document';
    if (/\.(xlsx?|ods|csv|tsv)$/.test(lower)) return 'Spreadsheet';
    if (/\.(pptx?|odp)$/.test(lower)) return 'Presentation';
    if (/\.(js|ts|jsx|tsx|java|c|cpp|cs|go|rs|py|php|rb|swift|kt|sql|html|css|json|yml|yaml|xml|ini|cfg|env)$/.test(lower)) {
        return 'Code/Config';
    }
    if (/\.(db|sqlite|sqlite3|bak|bin|dat)$/.test(lower)) return 'Data';

    return 'Other';
}

async function getFiles(db = getCurrentDB()) {
    await ensureBaseTables(db);
    await ensureFileColumns(db);
    
    const rows = await all(db, `
        SELECT 
            id,
            name,
            original_name,
            hash,
            added_date
        FROM files 
        ORDER BY id DESC
    `);
    
    return rows.map(row => ({
        ...row,
        type: mapFileType(row.original_name || row.name)
    }));
}

async function addFile(payload, db = getCurrentDB()) {
    await ensureBaseTables(db);
    await ensureFileColumns(db);
    
    console.log('Adding file to database:', payload);
    
    const { name, originalName, hash, addedDate } = payload;
    
    try {
        const res = await run(db,
            'INSERT INTO files (name, original_name, hash, added_date) VALUES (?,?,?,?)',
            [name, originalName, hash, addedDate]
        );
        console.log('File added to database with ID:', res.lastID);
        return { id: res && res.lastID };
    } catch (error) {
        console.error('Error adding file to database:', error);
        throw error;
    }
}

async function updateFile(id, payload, db = getCurrentDB()) {
    await ensureBaseTables(db);
    await ensureFileColumns(db);
    
    const fields = [];
    const params = [];
    
    if (payload.name != null) { fields.push('name = ?'); params.push(payload.name); }
    if (payload.originalName != null) { fields.push('original_name = ?'); params.push(payload.originalName); }
    if (payload.hash != null) { fields.push('hash = ?'); params.push(payload.hash); }
    
    if (fields.length === 0) return { changes: 0 };
    
    params.push(id);
    const res = await run(db, `UPDATE files SET ${fields.join(', ')} WHERE id = ?`, params);
    return { changes: res && res.changes };
}

async function deleteFile(id, db = getCurrentDB()) {
    await ensureBaseTables(db);
    const res = await run(db, 'DELETE FROM files WHERE id = ?', [id]);
    return { changes: res && res.changes };
}

async function getFileById(id, db = getCurrentDB()) {
    await ensureBaseTables(db);
    await ensureFileColumns(db);
    return get(db, 'SELECT * FROM files WHERE id = ?', [id]);
}

async function getFileByName(name, db = getCurrentDB()) {
    await ensureBaseTables(db);
    await ensureFileColumns(db);
    return get(db, 'SELECT * FROM files WHERE name = ?', [name]);
}

async function getFilesCount(db = getCurrentDB()) {
    await ensureBaseTables(db);
    const result = await get(db, 'SELECT COUNT(*) AS c FROM files');
    return (result && result.c) || 0;
}

module.exports = {
    ensureFileColumns,
    getFiles,
    addFile,
    updateFile,
    deleteFile,
    getFileById,
    getFileByName,
    getFilesCount
};