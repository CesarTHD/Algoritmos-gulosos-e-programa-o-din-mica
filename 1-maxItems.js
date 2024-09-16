const { performance } = require('perf_hooks');
const fs = require('fs');

// Função para maximizar itens na mochila
function maximizeItems(n, W, items) {
    // Ordenar itens pelo peso (segundo valor em cada array) e manter a indexação original
    items = items.map((item, index) => ({ value: item[0], weight: item[1], index: index }))
                 .sort((a, b) => a.weight - b.weight);
    // console.log("order", items)
    let totalWeight = 0;
    let itemCount = 0;
    let selectedItems = [];
    let selectionVector = new Array(n).fill(0); // Vetor para marcar itens selecionados

    for (let i = 0; i < n; i++) {
        let value = items[i].value;
        let weight = items[i].weight;
        let originalIndex = items[i].index;

        if (totalWeight + weight <= W) {
            // Adicionar o item na mochila
            totalWeight += weight;
            itemCount++;
            selectedItems.push([value, weight]);
            selectionVector[originalIndex] = 1; // Marcar o item como selecionado usando o índice original
        }
    }

    return {
        itemCount: itemCount,
        totalWeight: totalWeight,
        selectedItems: selectedItems,
        selectionVector: selectionVector
    };
}

// Ler o arquivo
// const filePath = 'instances_01_KP/large_scale/knapPI_1_100_1000_1';
// const filePath = 'instances_01_KP/large_scale/knapPI_1_500_2500_1';
// const filePath = 'instances_01_KP/large_scale/knapPI_1_2000_1000_1';
// const filePath = 'instances_01_KP/large_scale/knapPI_1_10000_1000_1';

// const filePath = 'instances_01_KP/low-dimensional/f3_l-d_kp_4_20';
// const filePath = 'instances_01_KP/low-dimensional/f1_l-d_kp_10_269';
// const filePath = 'instances_01_KP/low-dimensional/f10_l-d_kp_20_879';
// const filePath = 'instances_01_KP/low-dimensional/f8_l-d_kp_23_10000';


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Processar os dados de entrada
    const lines = data.trim().split('\n');
    const firstLine = lines[0].split(' ');

    const n = parseInt(firstLine[0]);
    const W = parseInt(firstLine[1]);

    const items = [];
    for (let i = 1; i <= n; i++) {
        const parts = lines[i].split(' ');
        const value = parseInt(parts[0]);
        const weight = parseInt(parts[1]);
        items.push([value, weight]);
    }
    const start = performance.now();
    
    const result = maximizeItems(n, W, items);
    
    const end = performance.now();
    
    console.log('\nMaximo de itens');
    console.log(filePath, "\n");

    console.log(`{"N": ${n}, "W": ${W}, "n": ${result.itemCount}, "w": ${result.totalWeight}, "time": ${(end - start).toFixed(3)}},`);
});
