'use client';

import { Currency } from "@/types";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const CurrenciesRates = ({ lng }: { lng: string }) => {
  const currencies = useSelector((state: RootState) => state.currencies.all);

	return (
	<tbody>
	{currencies.map((currency: Currency) => {
		const usdRate = currencies.find((c: Currency) => c.code === 'USD')?.rate || 1;
		return (
			<tr key={currency.code}>
				<td>{currency.code}</td>
				<td>{lng === 'ru' ? currency.nameRu : currency.nameEn}</td>
				<td>{(currency.rate / usdRate).toFixed(4)}</td>
			</tr>
		);
	})}
</tbody>)
}