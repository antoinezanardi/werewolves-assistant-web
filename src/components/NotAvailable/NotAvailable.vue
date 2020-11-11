<template>
    <div id="not-available" class="h-100 d-flex flex-column justify-content-center align-items-center container-fluid">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center" v-html="$t('NotAvailable.theAssistantIsUnavailable')"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center" v-html="$t('NotAvailable.willBeAvailableSoon')"/>
            </div>
        </div>
        <button class="btn btn-primary btn-lg mt-4" @click="reloadPage">
            <i class="fa fa-redo mr-2"/>
            <span v-html="$t('NotAvailable.refresh')"/>
        </button>
    </div>
</template>

<script>
export default {
    name: "NotAvailable",
    methods: {
        reloadPage() {
            window.location.reload();
        },
    },
};
</script>

<style scoped>

</style>