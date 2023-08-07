import { ProgressSpinner } from 'primereact/progressspinner';

export default function LoadingSpinner() {
    return (
        <div className="card flex justify-center items-center">
            <ProgressSpinner  style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
        </div>
    );
}
