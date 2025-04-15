const BASE_URL = 'https://apna-bank-i5zq.vercel.app/'; 

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'index.html';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const accountsRes = await fetch('https://apna-bank-i5zq.vercel.app/api/accounts', { headers });
    const accounts = await accountsRes.json();

    if (!accountsRes.ok) throw new Error('Failed to fetch accounts');

    document.getElementById('userInfo').innerHTML = `
      <h2>User Info</h2>
      <p><strong>Email:</strong> ${accounts[0]?.user?.email || 'N/A'}</p>
    `;

    const accountsList = document.getElementById('accountsList');
    accounts.forEach(acc => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${acc.accountNumber}</strong> - ${acc.accountType.toUpperCase()} - ₹${acc.balance}
        <br>Status: ${acc.status}
      `;
      accountsList.appendChild(li);
    });

    if (accounts.length > 0) {
      const txRes = await fetch(\`https://apna-bank-i5zq.vercel.app/api/transactions/account/\${accounts[0]._id}\`, { headers });
      const transactions = await txRes.json();
      
      const txList = document.getElementById('transactionsList');
      transactions.forEach(tx => {
        const li = document.createElement('li');
        li.innerHTML = `
          ₹${tx.amount} - ${tx.type.toUpperCase()} - ${new Date(tx.createdAt).toLocaleString()}
          <br>Status: ${tx.status}
        `;
        txList.appendChild(li);
      });
    }

  } catch (err) {
    console.error(err);
    alert('Something went wrong loading your dashboard');
  }
});

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}
