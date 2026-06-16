import styles from './BadAdviceForTravelersWindow.module.css';

export function BadAdviceForTravelersWindow() {
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bad Advice For Travelers</h1>
      </header>

      <section className={styles.section}>
        <p className={styles.text}>
          220 pages, hardcover — Taken from over 150 entries written in iPhone notes between
          2019 and 2021, with delightfully primitive illustrations by Kaleob Elkins, Bad Advice
          For Travelers is a joke, an exercise in maudlin self-pity, an anthology of north country
          koans, "impossible to keep track of what page you're on", "very easy to lose your place
          in", a pocket-size book that explores what it feels like to realize you're lost, and
          exists purely for the joy of having something in your hand (or you're back pocket).
        </p>
      </section>
    </div>
  );
}

export default BadAdviceForTravelersWindow;
