export default function ConvertMoney(value: number): string {
    return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}