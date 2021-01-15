# Makar Ermokhin
# Adjust `map` and `expected_number` variables below if needed
# and run this file: `ruby makar-ermokhin.rb`

# Number of Islands: 10
map = [
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1]
]
expected_number = 10

class Map
  def initialize(map)
    @array = map
  end

  # Point is an array of two integers
  def [](point)
    @array[point.first][point.last]
  end

  def height
    @array.length
  end

  def width(i)
    @array[i]&.length.to_i
  end

  def each_point(&block)
    @array.each.with_index do |row, i|
      row.each.with_index do |_, j|
        block.call(i, j)
      end
    end
  end
end

class Island
  attr_reader :points

  def initialize
    @points = []
  end

  def grow(points_to_add)
    points_to_add.select { |p| !@points.include? p }.tap { |not_existing| @points += not_existing }
  end

  def include?(point)
    points.include?(point)
  end
end

class IslandCounter
  def self.scan(map)
    new(map).scan
  end

  def scan
    current_island = nil

    map.each_point do |i, j|
      point = [i, j]
      next if map[point] == 0
      next if @registered_islands.any? { |island| island.include?(point) }

      current_island = Island.new
      grown = current_island.grow([point])

      until grown.empty? do
        new_grown = []
        grown.each { |p| new_grown += current_island.grow(find_nearest_lands(p)) }
        grown = new_grown
      end

      @registered_islands << current_island
    end

    @registered_islands.size
  end

  private

  attr_reader :map

  def initialize(map)
    @map = Map.new(map)
    @registered_islands = []
    @count = 0
  end

  def find_nearest_lands(point)
    i, j = point

    [
      [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
      [i, j - 1], [i, j + 1],
      [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
    ].select do |point|
      !point.any?(&:negative?) &&
        (point.last < map.width(point.first)) &&
        (point.first < map.height) &&
        (map[point] == 1)
    end
  end
end

actual_number = IslandCounter.new(map).scan

puts <<~MSG
  Expected number: #{expected_number}
  Actual number: #{actual_number}
  #{expected_number == actual_number ? "Matched" : "Not matched"}
MSG
