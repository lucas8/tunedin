import theme from '../theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function styledLog(message: any, success: boolean) {
    const styles = [
        `background: ${success ? theme.brand.primary : theme.brand.error}`,
        'color: white',
        'display: block',
        'text-align: center',
        'font-weight: bold',
        'padding: 5px 10px',
        'border-radius: 7px',
    ].join(';');

    if (success) {
        console.log(`%c${message}`, styles);
    } else {
        console.error(`%c${message}`, styles);
    }
}
