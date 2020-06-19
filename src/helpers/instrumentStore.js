let _instrument = null;
const InstrumentStore = {
    setInstrument: item => {
        _instrument = {
            ...item
        };
    },
    getInstrument: () => _instrument,
};
export default InstrumentStore;
