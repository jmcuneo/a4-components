<script>
    let num1 = 0;
    let num2 = 0;

    const addition = async function(event) {
        event.preventDefault();

        const num1Input = num1; // Get the value of num1 from Svelte's reactive variable
        const num2Input = num2; // Get the value of num2 from Svelte's reactive variable

        const json = { operation: 'addition', num1: num1Input, num2: num2Input };
        const body = JSON.stringify(json);

        try {
            const response = await fetch("/addition", { // Send the request to the /addition endpoint
                method: "POST",
                body: body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            const resultElement = document.querySelector('#result');
            if (resultElement) {
                resultElement.textContent = "Result: " + JSON.stringify(responseData.result);
            }

            updateTable();
        } catch (error) {
            console.error('Error fetching addition operation:', error);
        }
    };
</script>

