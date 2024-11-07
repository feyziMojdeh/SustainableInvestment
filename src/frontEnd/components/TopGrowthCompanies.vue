
<template>
    <div>
        <h2>Top 3 Growth Companies</h2>
        <table>
            <tr>
                <th>Company</th>
                <th>Growth</th>
            </tr>
            <tr v-for="company in topGrowthCompanies" :key="company.symbol">
                <td>{{ company.company }}</td>
                <td>{{ company.growth }}%</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: ['investments'],
    computed: {
        topGrowthCompanies() {
            return this.investments
                .filter(company => company.growth > 21)
                .sort((a, b) => b.growth - a.growth)
                .slice(0, 3);
        }
    }
};
</script>
        