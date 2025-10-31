import { useState } from 'react';

function StringCalculator() {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    setError(false);
    if (!input.trim()) {
      setError(true);
      return;
    }

    const nums = input
      .split(/[\n,]+/)
      .map((n) => n.trim())
      .filter((n) => n)
      .map(Number);

    if (nums.some(isNaN)) {
      setError(true);
      return;
    }

    const sum = nums.reduce((acc, val) => acc + val, 0);
    setResult(sum);
  };

  return (
    <main style={{ padding: '20px', backgroundColor: '#fff', color: '#aaa' }}>
      <img
        src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={600}
        height={400}
        alt="String calculator"
      />
      <h1>String Calculator</h1>

      <label htmlFor="numbers-input" style={{ fontWeight: 'bold' }}>
        Enter numbers
      </label>

      <textarea
        id="numbers-input"
        name="numbers"
        aria-label="Enter numbers to calculate their sum"
        placeholder="Enter numbers separated by commas, e.g., 1,2,3"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key == 'Enter') handleCalculate();
        }}
        style={{
          margin: '10px 0',
          width: '100%',
          minHeight: '80px',
          color: '#333',
        }}
      />

      <button
        type="button"
        onClick={handleCalculate}
        style={{
          padding: '10px 20px',
          backgroundColor: '#008cba',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Calculate
      </button>

      {!error && (
        <div
          aria-live="polite"
          style={{
            marginTop: '10px',
            color: result !== null ? 'green' : '#555',
          }}
        >
          {result !== null && <p>Result: {result}</p>}
        </div>
      )}

      {error && (
        <div
          role="alert"
          aria-label="Input instructions"
          style={{
            marginTop: '15px',
            backgroundColor: '#f8f8f8',
            padding: '10px',
            borderLeft: '4px solid #008cba',
          }}
        >
          <p> Make sure you enter numbers correctly</p>
        </div>
      )}
    </main>
  );
}

export default StringCalculator;
