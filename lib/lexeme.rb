class Lexeme
def initialize(lex,category)
@lex = lex
@category = category
end

def to_s
"#{@category} => #{@lex}"
end
end