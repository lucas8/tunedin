export default function styledLog(message: any) {
    const styles = [
        'background: #1DB954',
        'border: 1px solid #3E0E02',
        'color: white',
        'display: block',
        'text-align: center',
        'font-weight: bold',
        'padding: 5px 10px',
        'border-radius: 7px',
    ].join(';');

    console.log(`%c${message}`, styles);
}
