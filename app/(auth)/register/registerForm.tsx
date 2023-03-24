'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

export default function RegisterForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.mainDiv}>
        <div className={styles.divOne}>
          <h1>Register</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
              });

              const data: RegisterResponseBodyPost = await response.json();

              if ('errors' in data) {
                setErrors(data.errors);
                return;
              }

              const returnTo = getSafeReturnToPath(props.returnTo);

              if (returnTo) {
                router.push(returnTo);
                return;
              }

              router.replace(`/profile/${data.user.username}`);
              router.refresh();
            }}
          >
            {errors.map((error) => (
              <div key={`error-${error.message}`}>Error: {error.message}</div>
            ))}
            <div className={styles.inputContainer}>
              <label>
                Username
                <input
                  value={username}
                  onChange={(event) => setUsername(event.currentTarget.value)}
                  placeholder="username"
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label>
                Password
                <input
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  placeholder="password"
                />
              </label>
            </div>
            <div className={styles.buttonContainer}>
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
