import styles from './AboutCard.module.scss';

export interface AboutProps {
  photo: string;
  fullName: string;
  role: string;
  github: string;
  contribution: string;
}

export const AboutCard = (props: AboutProps) => {
  const { photo, fullName, role, github, contribution } = props;
  return (
    <div className={styles.aboutCard}>
      <div className={styles.photoContainer}>
        <img className={styles.photo} src={photo} alt="Team member" />
      </div>
      <div className={styles.aboutCardInfo}>
        <div className={styles.fullnameContainer}>
          <h4 className={styles.fullnameTitle}>{fullName}</h4>
          <a className={styles.githubLink} href={github}>
            <svg xmlns="//www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
              <g clipPath="url(#clip0_1237_14)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.893 0C5.82841 0 0.925781 5.04167 0.925781 11.2789C0.925781 16.2646 4.06707 20.485 8.42486 21.9787C8.9697 22.091 9.16927 21.736 9.16927 21.4374C9.16927 21.1759 9.15131 20.2796 9.15131 19.3458C6.1005 20.0182 5.46519 18.0013 5.46519 18.0013C4.9749 16.6941 4.24845 16.3581 4.24845 16.3581C3.24992 15.6672 4.32119 15.6672 4.32119 15.6672C5.42882 15.7419 6.01003 16.825 6.01003 16.825C6.99037 18.5428 8.57011 18.0574 9.20564 17.7586C9.29633 17.0303 9.58705 16.5261 9.89572 16.2461C7.46248 15.9846 4.90239 15.0136 4.90239 10.6812C4.90239 9.44877 5.3379 8.44044 6.02799 7.65623C5.91911 7.37619 5.5377 6.21821 6.13709 4.66835C6.13709 4.66835 7.06311 4.36952 9.15109 5.8261C10.045 5.57921 10.9669 5.45362 11.893 5.45256C12.819 5.45256 13.763 5.58342 14.6347 5.8261C16.7229 4.36952 17.6489 4.66835 17.6489 4.66835C18.2483 6.21821 17.8667 7.37619 17.7578 7.65623C18.4661 8.44044 18.8836 9.44877 18.8836 10.6812C18.8836 15.0136 16.3235 15.9658 13.8721 16.2461C14.2717 16.6008 14.6165 17.273 14.6165 18.3375C14.6165 19.85 14.5986 21.0639 14.5986 21.4372C14.5986 21.736 14.7984 22.091 15.343 21.9789C19.7008 20.4847 22.842 16.2646 22.842 11.2789C22.86 5.04167 17.9394 0 11.893 0Z"
                  fill="#274C5B"
                />
              </g>
              <defs>
                <clipPath id="clip0_1237_14">
                  <rect width="22" height="22" fill="white" transform="translate(0.925781)" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
        <h5 className={styles.roleTitle}>{role}</h5>
        <h3 className={styles.contributionTitle}>Contribution to the project:</h3>
        <p className={styles.contributionDescription}>{contribution}</p>
      </div>
    </div>
  );
};
