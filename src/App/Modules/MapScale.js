let Base = {
    width: 1920,
    svg: 1440
}

Base.scale = (Base.svg*1.058)/Base.width

const Scale = (Base.scale*window.innerWidth)/Base.width

module.exports = Scale;
