
function findEmployee(id) {
    const cleanId = id.trim().toUpperCase();
    return data.find(emp => 
        String(emp.ID).trim().toUpperCase() === cleanId ||
        String(emp.Perm_ID).trim().toUpperCase() === cleanId
    );
}

function checkSkill(id) {
    const cleanId = id.trim().toUpperCase();
    return gsmIds.includes(cleanId) ? "Special GSM" : "Non Special GSM";
}

function createResultElement(title, result) {
    const div = document.createElement('div');
    div.className = "result-item " + (result === 'Approved' ? 'approved' : 'disapproved');
    const icon = result === 'Approved' ? '✅' : '❌';
    div.innerHTML = `${icon} ${title}: ${result}`;
    return div;
}

document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.getElementById('checkButton');
    if (checkButton) {
        checkButton.addEventListener('click', function() {
            const id1 = document.getElementById('id1').value;
            const id2 = document.getElementById('id2').value;

            const emp1 = findEmployee(id1);
            const emp2 = findEmployee(id2);

            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '';

            if (!emp1 || !emp2) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'final-disapproved';
                if (!emp1 && !emp2) {
                    errorDiv.innerText = '❌ Both employees not found in Data!';
                } else if (!emp1) {
                    errorDiv.innerText = '❌ Employee 1 not found in Data!';
                } else {
                    errorDiv.innerText = '❌ Employee 2 not found in Data!';
                }
                resultDiv.appendChild(errorDiv);
                return;
            }

            const empInfo1 = document.createElement('div');
empInfo1.className = 'card';
empInfo1.innerHTML = `
<strong>Employee 1:</strong><br>
Name: ${emp1.Full_Name}<br>
Leader: ${emp1.Leader}<br>
Location: ${emp1.Location}<br>
LOB: ${emp1.LOB}<br>
Skill: ${checkSkill(id1)}
`;
resultDiv.appendChild(empInfo1);

const empInfo2 = document.createElement('div');
empInfo2.className = 'card';
empInfo2.innerHTML = `
<strong>Employee 2:</strong><br>
Name: ${emp2.Full_Name}<br>
Leader: ${emp2.Leader}<br>
Location: ${emp2.Location}<br>
LOB: ${emp2.LOB}<br>
Skill: ${checkSkill(id2)}
`;
resultDiv.appendChild(empInfo2);

            const locationResult = emp1.Location.trim().toLowerCase() === emp2.Location.trim().toLowerCase() ? 'Approved' : 'Disapproved';
            const lobResult = emp1.LOB.trim().toLowerCase() === emp2.LOB.trim().toLowerCase() ? 'Approved' : 'Disapproved';
            const skill1 = checkSkill(id1);
            const skill2 = checkSkill(id2);
            const skillResult = skill1 === skill2 ? 'Approved' : 'Disapproved';

            resultDiv.appendChild(createResultElement('Location Check', locationResult));
            resultDiv.appendChild(createResultElement('LOB Check', lobResult));
            resultDiv.appendChild(createResultElement('Skill Check', skillResult));

            const finalDiv = document.createElement('div');
            if (locationResult === 'Approved' && lobResult === 'Approved' && skillResult === 'Approved') {
                finalDiv.className = 'final-approved';
                finalDiv.innerText = '✅ Swap Approved';
            } else {
                finalDiv.className = 'final-disapproved';
                finalDiv.innerText = '❌ Swap Rejected';
            }
            resultDiv.appendChild(finalDiv);
        });
    }
});
