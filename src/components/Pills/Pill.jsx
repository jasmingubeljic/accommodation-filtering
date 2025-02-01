import styles from './Pill.module.css'

export default function Pill({ title, value }) {
  if(typeof value === 'string' && value.includes('null')) return
  if (typeof value === "boolean") {
    return (
      <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
        {value ? (
          <div>{title}<span className="text-green-500"> ✔</span></div>
        ) : (
          <div className={`line-through ${styles['text-decoration-style']}`}>{title}</div>
        )}
      </div>
    );
  } else {
    return (
      <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
        {title} <span className="font-semibold text-green-600">{value}</span>
      </div>
    );
  }
}
