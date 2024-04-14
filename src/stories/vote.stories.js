import Vote from "../components/Vote";

const stories = {
    title: 'Components/Vote',
    component: Vote
};
export default stories

const WithTypeVoteUp = ()=>{
    <Vote type="voteUp">
        20
    </Vote>
}

const WithTypeVoteDown = ()=>{
    <Vote type="voteDown">
        20
    </Vote>
}
export { WithTypeVoteUp, WithTypeVoteDown }