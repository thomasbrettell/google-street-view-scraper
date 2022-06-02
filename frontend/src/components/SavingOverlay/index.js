import styles from './SavingOverlay.module.scss';

const SavingOverlay = () => {
  return (
    <div className={styles['saving-overlay']}>
      <div className={styles.text}>
        Saving...
        <br />
        <br />
        This may take some time
      </div>
    </div>
  );
};

export default SavingOverlay;
