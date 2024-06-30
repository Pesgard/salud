<script lang="ts">
    export let data: { [key: string]: any } = {}; // Objeto con la información a mostrar
    export let excludeKeys: any[] = []; // Claves a excluir
    export let tituloTabla = ''; // Título de la tabla

    console.log(data);

    // Función para filtrar las claves a excluir y preparar los datos para la tabla
    $: filteredKeys = Object.keys(data).filter((key) => !excludeKeys.includes(key));

    function printTable() {
        const printContent = document.getElementById('printableTable').innerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`<html><head><title>${tituloTabla}</title>`);
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
</script>

<div class="max-w-full overflow-auto dark:bg-gray-800">
    <h2 class="text-lg font-semibold mb-4 dark:text-gray-200">{tituloTabla}</h2>
    <div id="printableTable">
        <table class="min-w-full leading-normal">
            <thead>
                <tr class="border-b border-gray-600 bg-gray-700">
                    {#each filteredKeys as key}
                        <th class="px-3 py-2 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            {key}
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-gray-600 dark:hover:bg-gray-600">
                    {#each filteredKeys as key}
                        <td class="px-3 py-1 text-sm text-gray-400">
                            {data[key]}
                        </td>
                    {/each}
                </tr>
            </tbody>
        </table>
    </div>
    <button on:click={printTable} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Imprimir
    </button>
</div>
