const fs = require('fs');

// Função para resolver o problema da mochila usando Programação Dinâmica
function knapsackDP(n, W, items) {
    // Criação de uma matriz (array bidimensional) para armazenar os valores máximos
    let dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    // Preenchimento da matriz dp
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            if (items[i - 1][1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - items[i - 1][1]] + items[i - 1][0]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Recuperar os itens selecionados
    let w = W;
    let selectedItems = [];
    let totalValue = dp[n][W];
    let totalWeight = 0;
    let selectionVector = new Array(n).fill(0);

    for (let i = n; i > 0 && totalValue > 0; i--) {
        if (totalValue !== dp[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            selectionVector[i - 1] = 1;
            totalWeight += items[i - 1][1];
            totalValue -= items[i - 1][0];
            w -= items[i - 1][1];
        }
    }

    return {
        totalValue: dp[n][W],
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

//  LOW-DIMENSIONAL
// const filePath = 'instances_01_KP/low-dimensional/f3_l-d_kp_4_20';
// const filePath = 'instances_01_KP/low-dimensional/f1_l-d_kp_10_269';
// const filePath = 'instances_01_KP/low-dimensional/f10_l-d_kp_20_879';
const filePath = 'instances_01_KP/low-dimensional/f8_l-d_kp_23_10000';

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
    
    const result = knapsackDP(n, W, items);
    
    const end = performance.now();
    
    console.log('\nDinâmico');
    console.log(filePath, "\n");

    console.log(`{"N": ${n}, "W": ${W}, "n": ${result.selectedItems.length}, "w": ${result.totalWeight}, "time": ${(end - start).toFixed(3)}},`);
});
