<script lang="ts">
    export let data: { [key: string]: any } = {};
    export let excludeKeys: any[] = [];
    export let tituloTabla = '';

    console.log(data);

    // Asegúrate de que filteredKeys siempre sea un array
    $: filteredKeys = Object.keys(data).length > 0 ? Object.keys(data[0]).filter((key) => !excludeKeys.includes(key)) : [];

    function printTable() {
        const printableElement = document.getElementById('printableTable');
        if (printableElement) {
            const printContent = printableElement.innerHTML;
            const printWindow = window.open('', '', 'height=600,width=800');
            if (printWindow) {
                printWindow.document.write(`<html><head><title>${tituloTabla}</title>`);
                printWindow.document.write('<style>body { font-family: Arial, sans-serif; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style>');
                printWindow.document.write('</head><body>');
                printWindow.document.write(printContent);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            } else {
                console.error('Failed to open print window. Possibly blocked by a popup blocker.');
            }
        } else {
            console.error('Printable element not found.');
        }
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
                {#each Object.values(data) as patient}
                    <tr class="border-b border-gray-600 dark:hover:bg-gray-600">
                        {#each filteredKeys as key}
                            <td class="px-3 py-1 text-sm text-gray-400">
                                {patient[key]}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <button on:click={printTable} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Imprimir
    </button>
</div>
