<?php
header('Content-Type: application/json');
// Liste des fichiers de blocs en scannant le dossier
$blocksFolder = "blocks2";
$blocksDir = __DIR__ . "/" . $blocksFolder;
$blockFiles = [];

if (is_dir($blocksDir)) {
    $files = scandir($blocksDir);
    foreach ($files as $file) {
        // Filtrer les fichiers .jsx et .js, exclure index.php et index.js
        if (preg_match('/\.(jsx|js)$/', $file) && $file !== 'index.php' && $file !== 'index.js') {
            $blockFiles[] = $blocksFolder . "/" . $file;
        }
    }
    // Trier les fichiers par ordre alphabétique
    sort($blockFiles);
}

echo json_encode($blockFiles);
