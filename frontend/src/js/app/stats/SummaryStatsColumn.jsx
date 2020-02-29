import React from 'react';
import {SummaryAverageRow} from "./SummaryAverageRow";
import {StatsChart} from "./StatsChart";

export class SummaryStatsColumn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedChartType: 'OIL'
        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    render() {
        console.log(this.state);

        const {isLoaded, stats} = this.props;
        const dataExists = isLoaded && stats.recordsQuantity > 0;
        const avgs = dataExists
            ? (
                stats.avg.map((avgRec, inx) => {
                    return <SummaryAverageRow averageRecord={avgRec} key={inx + Math.random()}/>
                })
            ) : null;

        return (
            <div className="column">
                <p className="title is-5">{dataExists ? `Количество сводок за период: ${stats.recordsQuantity}` : 'Сводки не найдены'}</p>
                <table>
                    <tbody>
                    {avgs}
                    </tbody>
                </table>
                <p/>
                {dataExists ? (
                    <div>
                        <div className="select">
                            <select value={this.state.selectedChartType} onChange={this.handleTypeChange}>
                                <option value="OIL">Масло ГД</option>
                                <option value="FUEL_DT">ТОПЛИВО ДТ</option>
                                <option value="FUEL_DS">ТОПЛИВО ДC</option>
                                <option value="CORRUGATED_PACKAGE">ГОФРОТАРА</option>
                                <option value="POLYPROPYLENE_BAG">ПОЛИПРОПИЛЕНОВЫЕ МЕШКИ ДЛЯ МУКИ</option>
                                <option value="BAGS_WITHOUT_LINER">П/П МЕШКИ БЕЗ ВКЛАДЫША</option>
                                <option value="VACUUM_BAGS">ВАКУУМ МЕШКИ</option>
                                <option value="PLASTIC_BAGS">ПОЛИЭТИЛЕНОВЫЕ ПАКЕТЫ ДЛЯ МЯСА</option>
                                <option value="NATUROX">Антиоксидант НАТУРОКС</option>
                                <option value="TOXININ">Антиоксидант ТОКСИКИН</option>
                                <option value="FROZEN_KRILL_MEAT">МЯСО КРИЛЯ МОРОЖЕННОЕ</option>
                                <option value="KRILL_FLOUR_CHINA">МУКА КРИЛЕВАЯ (КИТАЙСКАЯ МУКОМОЛКА)</option>
                                <option value="KRILL_FLOUR_NEZHIN">МУКА КРИЛЕВАЯ (МУКОМОЛКА НЕЖИН)</option>
                                <option value="ICE_FISH_CATCH">РЫБА ЛЕДЯНАЯ(ПРИЛОВ)</option>
                                <option value="ICE_FISH">РЫБА ЛЕДЯНАЯ</option>
                                <option value="KRILL_FISH">КРИЛЬ</option>
                                <option value="OTHER_FISH">ДРУГАЯ РЫБА</option>
                            </select>
                        </div>
                        {dataExists ? <StatsChart data={stats.stats[this.state.selectedChartType]}/> : null}
                    </div>
                ) : null}

            </div>
        );
    }

    handleTypeChange(event) {
        this.setState({selectedChartType: event.target.value});
    }
}

