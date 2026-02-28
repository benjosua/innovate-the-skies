<script lang="ts">
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<div class="container">
  <header>
    <h1>Innovate the Skies</h1>
    <p class="subtitle">Svelte Browser Extension</p>
  </header>

  <main>
    <div class="counter-section">
      <p>Count: {count}</p>
      <button on:click={increment}>Increment</button>
    </div>

    <div class="info-section">
      <h2>Welcome!</h2>
      <p>This extension is rendered in the side panel.</p>
      <ul>
        <li>Built with Svelte</li>
        <li>Powered by WXT</li>
        <li>Uses Chrome Side Panel API</li>
      </ul>
    </div>
  </main>

  <footer>
    <p>Click the extension icon to open/close the side panel</p>
  </footer>
</div>

<style>
  .container {
    min-height: 100vh;
    padding: 24px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  header {
    text-align: center;
    margin-bottom: 32px;
  }

  h1 {
    font-size: 1.8rem;
    margin: 0 0 8px 0;
    font-weight: 700;
  }

  .subtitle {
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .counter-section,
  .info-section {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .counter-section {
    text-align: center;
  }

  .counter-section p {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 16px 0;
  }

  button {
    background: white;
    color: #667eea;
    border: none;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  button:active {
    transform: translateY(0);
  }

  .info-section h2 {
    margin: 0 0 12px 0;
    font-size: 1.2rem;
  }

  .info-section p {
    margin: 0 0 12px 0;
    opacity: 0.9;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
    opacity: 0.9;
  }

  footer {
    margin-top: 24px;
    text-align: center;
    font-size: 0.8rem;
    opacity: 0.7;
  }
</style>
