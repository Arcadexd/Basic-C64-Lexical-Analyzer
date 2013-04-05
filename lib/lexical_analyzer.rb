require "./keywords.rb"
require "./lexeme.rb"


class LexicalAnalyzer
	
	def line_to_lexemes line
		tokens =[]
		last_token=0
		end_token=0
		string=false
		line.each_char { |chr|
			if chr == "\""
				string = !string
				tokens << line[last_token..end_token]
				last_token=end_token+1
			end
			if $OPS.include?(chr) and !string
				if $OPS.include?(line[end_token+1])
					tokens << line[last_token..end_token]
					tokens << line[end_token..end_token+1]
					last_token=end_token+2
					end_token+=1
				else
					tokens << line[end_token..end_token]
					last_token=end_token+1
				end
			end
			if $SYMBOLS.include?(chr) and !string
					tokens << line[end_token..end_token]
					last_token=end_token+1
			end
			if chr == " " and !string
					tokens << line[last_token..end_token]
					last_token=end_token+1
			end
			if chr == "\n"
				tokens << line[last_token..end_token-1]
			end
				end_token+=1
		}
		print tokens
	end

	def classify_tokens_to_lexemes tokens
		
	end

	def remove_quotes line
		quotes = []
		quote = ""
		add = false
		line.split("").each_index { |i| 
			if line[i] == "\"" and add == false
				add = true
			elsif line[i] == "\"" and add == true
				add = false
				quotes << quote[0, quote.length]+"\""
			end
			if add 
				quote << line[i]
			end
		}
		quotes.each { |q| 
			line.slice!(q)
		}
		quotes
	end

	def code_to_lexemes file
		lines = file.split("\n")
		lexemes = []
		lines.each_with_index do |l, i|  
			puts
			lexemes << line_to_lexemes(l+"\n")
		end
		puts
		lexemes
	end

end
