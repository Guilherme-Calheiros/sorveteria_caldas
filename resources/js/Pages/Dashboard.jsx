import { Button } from '@/Components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formataMoeda } from '@/Utils/moeda';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { LuCalendar, LuIceCreamCone, LuPackage, LuPercent, LuReceiptText, LuUsers, LuWallet } from 'react-icons/lu';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function Dashboard({ultimosPedidos, pedidosNoPeriodo, totalVendas, totalPedidos, ticketMedio, topSabores, topEmbalagens, funcionariosAtivos, totalSabores, totalEmbalagens, periodo}) {

    const [dataKey, setDataKey] = useState('quantidade');

    console.log(ultimosPedidos)

    const chartConfig = {
        total: {
            label: "Total"
        }
    }

    const cores = [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
        'hsl(var(--chart-5))'
    ];

    const sabores = topSabores.map((sabor, index) => ({
        ...sabor,
        fill: cores[index % cores.length],
    }));

    const handlePeriodoChange = (selectedPeriodo) => {
        router.get(route('dashboard'), { periodo: selectedPeriodo }, { preserveScroll: true });
    };

    const periodosLabels = {
        hoje: "Hoje",
        semana: "na Semana",
        mes: "no Mês",
        ano: "no Ano",
    };

    const maxValue = Math.max(...pedidosNoPeriodo.map(p => p[dataKey]));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className='flex items-center gap-2 bg-white p-4 rounded-lg shadow mb-6'>
                <div className='flex items-center gap-2'>
                    <LuCalendar className='h-5 w-5'/>
                    <span className='font-semibold'>Período:</span>
                </div>
                <div className='flex gap-2'>
                    {['hoje','semana','mes','ano'].map(p => (
                        <Button
                        key={p}
                        variant={periodo === p ? 'default' : 'outline'}
                        onClick={() => handlePeriodoChange(p)}
                        >
                        {periodosLabels[p]}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className='col-span-12 lg:col-span-3'>
                    <div className='bg-white shadow-lg sm:rounded-xl p-6 border-l-4 border-primary-dark hover:shadow-xl transition-shadow duration-300 h-full'>
                        <div className='flex flex-col justify-center h-full'>
                            <div className="flex items-start justify-between">
                                <p className='text-sm font-medium'>Total de Pedidos</p>
                                <LuReceiptText className='w-8 h-8 text-primary-dark' />
                            </div>
                            <p className='text-4xl font-bold text-gray-900'>{totalPedidos}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-3'>
                    <div className='bg-white shadow-lg sm:rounded-xl p-6 border-l-4 border-primary-dark hover:shadow-xl transition-shadow duration-300 h-full'>
                        <div className='flex flex-col justify-center h-full'>
                            <div className="flex items-start justify-between">
                                <p className='text-sm font-medium'>Valor Total de Vendas</p>
                                <LuWallet className='w-8 h-8 text-primary-dark' />
                            </div>
                            <p className='text-4xl font-bold text-gray-900'>{formataMoeda(totalVendas)}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-3'>
                    <div className='bg-white shadow-lg sm:rounded-xl p-6 border-l-4 border-primary-dark hover:shadow-xl transition-shadow duration-300 h-full'>
                        <div className='flex flex-col justify-center h-full'>
                            <div className="flex items-start justify-between">
                                <p className='text-sm font-medium'>Ticket Médio</p>
                                <LuPercent className='w-8 h-8 text-primary-dark' />
                            </div>
                            <p className='text-4xl font-bold text-gray-900'>{formataMoeda(ticketMedio)}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-3'>
                    <div className='bg-white shadow-lg sm:rounded-xl p-4 hover:shadow-xl transition-shadow duration-300'>
                        <p className='text-sm font-medium mb-4'>Estatísticas Gerais</p>
                        <div className='space-y-1'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <LuUsers className='w-4 h-4' />
                                    <span className='text-sm'>Funcionários</span>
                                </div>
                                <span className='text-xl font-bold'>{funcionariosAtivos}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <LuPackage className='w-4 h-4' />
                                    <span className='text-sm'>Embalagens</span>
                                </div>
                                <span className='text-xl font-bold'>{totalEmbalagens}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <LuIceCreamCone className='w-4 h-4' />
                                    <span className='text-sm'>Sabores</span>
                                </div>
                                <span className='text-xl font-bold'>{totalSabores}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-6'>
                    <div className='flex flex-col bg-white shadow-sm sm:rounded-lg p-4 gap-4 h-96'>
                        <div className='font-bold flex items-center justify-between text-lg'>
                            <p>Pedidos {periodosLabels[periodo] || ''}</p>
                            <select
                                className="border rounded py-1"
                                value={dataKey}
                                onChange={e => setDataKey(e.target.value)}
                                >
                                    <option value="quantidade">Quantidade</option>
                                    <option value="valor">Valor</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <ChartContainer config={chartConfig}>
                                <BarChart
                                    accessibilityLayer
                                    data={pedidosNoPeriodo}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="periodo"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        interval={periodo === 'hoje' ? 2 : periodo === 'mes' ? 1 : 0}
                                        tickFormatter={(value) => {
                                            if (periodo === 'hoje') {
                                                return value;
                                            } else if (periodo === 'semana') {
                                                const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
                                                return diasSemana[new Date(value).getDay()];
                                            } else if (periodo === 'mes') {
                                                return parseInt(value.split('-')[2], 10);
                                            } else if (periodo === 'ano') {
                                                const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
                                                const mesIndex = parseInt(value.split('-')[1], 10) - 1;
                                                return meses[mesIndex];
                                            }
                                            return value;
                                        }}
                                    />
                                    <YAxis
                                        domain={[0, Math.ceil(maxValue * 1)]}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent
                                                hideLabel
                                                formatter={(value, name, item) => (
                                                    <div className="flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground">
                                                    <div
                                                        className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] h-2.5 w-2.5"
                                                        style={{
                                                            "--color-bg": item.color,
                                                            "--color-border": item.color,
                                                        }}
                                                    />
                                                    <div className="flex flex-1 gap-4 justify-between leading-none items-center">
                                                        <span className="text-muted-foreground capitalize">{name}</span>
                                                        <span className="font-mono font-medium tabular-nums text-foreground">
                                                        {dataKey.includes('valor') ? formataMoeda(value) : value}
                                                        </span>
                                                    </div>
                                                    </div>
                                                )}
                                            />
                                        }
                                    />
                                    <Bar dataKey={dataKey} fill="hsl(var(--primary))" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-3'>
                    <div className='flex flex-col overflow-hidden bg-white shadow-sm sm:rounded-lg p-8 h-96'>
                        <div className='font-bold text-lg'>
                            Top Sabores
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <ChartContainer config={chartConfig}>
                                <BarChart
                                    accessibilityLayer
                                    data={sabores}
                                    layout='vertical'
                                    margin={{ right: 40  }}
                                >
                                    <CartesianGrid horizontal={false} />
                                    <YAxis dataKey="name" type='category' hide />
                                    <XAxis dataKey="total" type='number' hide />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <Bar dataKey="total" radius={8}>
                                        {sabores.map((entry, index) => (
                                            <Cell key={index} fill={entry.fill} />
                                        ))}
                                        <LabelList
                                            dataKey="name"
                                            position="insideLeft"
                                            offset={8}
                                            fill='#fff'
                                            className='font-semibold'
                                            fontSize={12}
                                        />
                                        <LabelList
                                            dataKey="total"
                                            position="right"
                                            offset={8}
                                            fill='#000'
                                            fontSize={12}
                                        />
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-3'>
                    <div className='flex flex-col overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 h-96'>
                        <div className='font-bold text-lg'>
                            Top Embalagens
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <ChartContainer config={chartConfig}>
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel/>}
                                    />
                                    <Pie data={topEmbalagens} innerRadius={60} dataKey="total" nameKey="name">
                                        {topEmbalagens.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={cores[index % cores.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Legend
                                        formatter={(value, entry) => (
                                            <span style={{ color: '#000' }}>{value}</span>
                                        )}
                                    />
                                </PieChart>
                            </ChartContainer>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="col-span-full bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-primary to-primary-dark">
                        <h3 className='text-xl font-bold text-white'>Últimos Pedidos</h3>
                    </div>
                    <div className="h-80 overflow-y-auto">
                        <table className="table-auto w-full">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">ID</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Funcionário</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Cliente</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Observação</th>
                                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Data do Pedido</th>
                                    <th className="p-4 text-right text-sm font-semibold text-gray-700">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {ultimosPedidos.map((pedido) => (
                                    <tr
                                        key={pedido.id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="p-4 text-sm font-medium text-gray-900">#{pedido.id}</td>
                                        <td className="p-4 text-sm text-gray-700">{pedido.funcionario.name}</td>
                                        <td className="p-4 text-sm text-gray-700">{pedido.cliente_nome}</td>
                                        <td className="p-4 text-sm text-gray-500">{pedido.observacao ?? '-'}</td>
                                        <td className="p-4 text-sm text-gray-700">{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                                        <td className="p-4 text-sm font-semibold text-gray-900 text-right">{formataMoeda(pedido.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
