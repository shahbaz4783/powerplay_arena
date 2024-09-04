const GamePage = () => {
  return (
    <div>
      <h2>This is game Page</h2>

      <section className="grid gap-2 grid-cols-2">
        <div className="border">
          <p>Entry Fees: 20</p>
          <p>Reward 35</p>
          <p>Play Now</p>
        </div>
        <div className="border">
          <p>Entry Fees: 50</p>
          <p>Reward 90</p>
          <p>Play Now</p>
        </div>
        <div className="border">
          <p>Entry Fees: 100</p>
          <p>Reward 190</p>
          <p>Play Now</p>
        </div>
        <div className="border">
          <p>Entry Fees: 200</p>
          <p>Reward 380</p>
          <p>Play Now</p>
        </div>
      </section>
    </div>
  );
};

export default GamePage;
