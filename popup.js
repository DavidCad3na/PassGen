document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyPassword);

function generatePassword() {
  const length = parseInt(document.getElementById('length').value);

  if (length < 8 || length > 128) {
    document.getElementById('password').innerText = "Length must be between 8 and 128.";
    document.getElementById('copy').style.display = 'none';
    return;
  }

  const includeUpper = document.getElementById('includeUpper').checked;
  const includeLower = document.getElementById('includeLower').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;

  const upcaselet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowcaselet = "abcdefghijklmnopqrstuvwxyz";
  const digits = "1234567890";
  const symbols = "!@#$%^&*()_+{}:<>?|";
  let all = "";

  if (includeUpper) all += upcaselet;
  if (includeLower) all += lowcaselet;
  if (includeNumbers) all += digits;
  if (includeSymbols) all += symbols;

  if (all === "") {
    document.getElementById('password').innerText = "Please select at least one character set.";
    document.getElementById('copy').style.display = 'none';
    return;
  }

  const secureRandom = window.crypto || window.msCrypto;
  let password = "";
  for (let i = 0; i < length; i++) {
    const index = secureRandom.getRandomValues(new Uint32Array(1))[0] % all.length;
    password += all.charAt(index);
  }

  document.getElementById('password').innerText = password;
  document.getElementById('copy').style.display = 'inline';
}

function copyPassword() {
  const password = document.getElementById('password').innerText;
  navigator.clipboard.writeText(password).then(() => {
    alert('Password copied to clipboard');
  }, (err) => {
    console.error('Could not copy text: ', err);
  });
}
